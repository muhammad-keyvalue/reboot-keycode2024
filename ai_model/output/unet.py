import torch
import torch.nn as nn
import torch.nn.functional as F
import torchvision.transforms as T
from PIL import Image


# Define the U-Net block with skip connections
class UNetBlock(nn.Module):
    def __init__(self, in_channels, out_channels):
        super(UNetBlock, self).__init__()
        self.conv1 = nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(out_channels, out_channels, kernel_size=3, padding=1)
        self.bn1 = nn.BatchNorm2d(out_channels)
        self.bn2 = nn.BatchNorm2d(out_channels)

    def forward(self, x, skip_connection=None):
        if skip_connection is not None:
            # Concatenate the skip connection
            x = torch.cat(
                [x, skip_connection], dim=1
            )  # Concatenate along the channel dimension
        x = F.relu(self.bn1(self.conv1(x)))
        x = F.relu(self.bn2(self.conv2(x)))
        return x


# Full U-Net model with skip connections
class UNet(nn.Module):
    def __init__(self):
        super(UNet, self).__init__()

        # Encoder (downsampling)
        self.enc1 = UNetBlock(3, 64)
        self.enc2 = UNetBlock(64, 128)

        # Decoder (upsampling)
        # After concatenation, the channel size is doubled, so adjust accordingly
        self.dec1_x1 = UNetBlock(128 + 64, 64)  # 128 from enc2 + 64 from enc1
        self.dec1_x2 = UNetBlock(128 + 64, 64)

        self.final_conv = nn.Conv2d(64, 3, kernel_size=1)

    def forward(self, x1, x2):
        # Encoder for the first image
        enc1_x1 = self.enc1(x1)  # [batch, 64, h, w]
        enc2_x1 = self.enc2(F.max_pool2d(enc1_x1, 2))  # [batch, 128, h/2, w/2]

        # Encoder for the second image
        enc1_x2 = self.enc1(x2)  # [batch, 64, h, w]
        enc2_x2 = self.enc2(F.max_pool2d(enc1_x2, 2))  # [batch, 128, h/2, w/2]

        # Combine features from both images with skip connections
        dec1_x1 = self.dec1_x1(F.interpolate(enc2_x1, scale_factor=2), enc1_x1)
        dec1_x2 = self.dec1_x2(F.interpolate(enc2_x2, scale_factor=2), enc1_x2)

        # Output combined
        out_x1 = self.final_conv(dec1_x1)
        out_x2 = self.final_conv(dec1_x2)

        # Blending both outputs
        blended_output = (out_x1 + out_x2) / 2

        return blended_output


# Load and preprocess the images
def load_image(image_path, image_size=(256, 256)):
    image = Image.open(image_path)
    transform = T.Compose([T.Resize(image_size), T.ToTensor()])
    return transform(image).unsqueeze(0)  # Add batch dimension


def save_image(tensor, path):
    tensor = tensor.squeeze(0).permute(1, 2, 0)  # Remove batch and rearrange dimensions
    image = tensor.detach().numpy()
    image = (image * 255).astype("uint8")
    Image.fromarray(image).save(path)
    superimpose_images(
        "bird.jpeg", path, alpha1=0.3, alpha2=0.7, output_path="output.png"
    )


def superimpose_images(
    image1_path, image2_path, alpha1=0.1, alpha2=0.9, output_path="output.png"
):
    # Open both images
    img1 = Image.open(image1_path).convert("RGBA")
    img2 = Image.open(image2_path).convert("RGBA")

    # Resize the second image to match the size of the first
    img2 = img2.resize(img1.size)

    # Adjust alpha values (transparency) for each image
    img1_with_alpha = Image.blend(
        img1, Image.new("RGBA", img1.size, (0, 0, 0, 0)), alpha1
    )
    img2_with_alpha = Image.blend(
        img2, Image.new("RGBA", img2.size, (0, 0, 0, 0)), alpha2
    )

    # Superimpose the images
    blended_image = Image.alpha_composite(img1_with_alpha, img2_with_alpha)

    # Save the result
    blended_image.save(output_path)
    blended_image.show()


def blend(org_path, new_path):
    # Sample usage
    image1 = load_image(org_path)
    image2 = load_image(new_path)

    # Initialize the U-Net
    model = UNet()

    # Pass the images through the model
    output = model(image1, image2)

    # Convert the output back to an image and save it

    save_image(output, "blended_output.jpg")
