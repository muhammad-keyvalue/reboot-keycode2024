import os
import numpy as np
from PIL import Image
import torch
from torchvision import transforms
import torchvision.models as models
from art.attacks.evasion import MomentumIterativeMethod
from art.estimators.classification import PyTorchClassifier
import torch.nn as nn

from res import evaluate_image


def denormalize(tensor, mean, std):
    mean = torch.tensor(mean).view(1, -1, 1, 1).to(tensor.device)
    std = torch.tensor(std).view(1, -1, 1, 1).to(tensor.device)
    tensor = tensor * std + mean
    return tensor

def protect_image_mitm(image_path, output_folder, target_class_idx=1, level_count=5, current_count=0):
    try:
        org_id, org_prob = evaluate_image(image_path)
        # Load the image without resizing or cropping to retain aspect ratio
        image = Image.open(image_path).convert('RGB')
        # Preprocess the image without resizing
        preprocess = transforms.Compose([
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],  # ResNet50 mean
                std=[0.229, 0.224, 0.225]    # ResNet50 std
            ),
        ])
        input_tensor = preprocess(image)
        input_batch = input_tensor.unsqueeze(0)  # Add batch dimension

        # Move input to device
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        input_batch = input_batch.to(device)

        # Get input shape (channels, height, width)
        _, channels, height, width = input_batch.shape

        # Load pre-trained ResNet50 model
        model_pytorch = models.resnet50(pretrained=True)
        model_pytorch.eval()
        model_pytorch = model_pytorch.to(device)

        # Define loss function
        loss_fn = nn.CrossEntropyLoss()

        # Create PyTorchClassifier with variable input shape
        classifier = PyTorchClassifier(
            model=model_pytorch,
            loss=loss_fn,
            input_shape=(channels, height, width),
            nb_classes=1000,
            preprocessing=(0, 1),
            clip_values=(0, 1)
        )

        # Create target label (as numpy array)
        target_label = np.array([target_class_idx])

        # Create the Momentum Iterative Method attack
        attack = MomentumIterativeMethod(
            estimator=classifier,
            eps=0.15,          # Total perturbation (adjust as needed)
            eps_step=0.01,    # Step size per iteration
            max_iter=200,     # Number of iterations
            targeted=True
        )

        # Apply adversarial perturbation
        adversarial_image = attack.generate(x=input_batch.cpu().numpy(), y=target_label)


        # Convert adversarial image back to tensor
        adversarial_image_tensor = torch.from_numpy(adversarial_image[0]).to(device)

        # Denormalize the image
        mean = [0.485, 0.456, 0.406]
        std = [0.229, 0.224, 0.225]
        adversarial_image_tensor = denormalize(adversarial_image_tensor.unsqueeze(0), mean, std)
        adversarial_image_tensor = torch.clamp(adversarial_image_tensor, 0, 1)
        adversarial_image_tensor = adversarial_image_tensor.squeeze(0)

        # Move to CPU and convert to PIL Image
        adversarial_image_tensor = adversarial_image_tensor.cpu()
        adversarial_pil = transforms.ToPILImage()(adversarial_image_tensor)

        # Save the adversarial image
        # filename = os.path.basename(image_path)
        # output_path = os.path.join(output_folder, filename)
        adversarial_pil.save(output_folder)
        current_id, current_prob = evaluate_image(output_folder)
        if current_id != org_id or current_count > level_count:
            print("The image is protected")
            print(current_id)
            print(current_prob)
            return current_id, current_prob
        else:
            print("Current Probability: ", current_id)
            print("Current Probability: ", current_prob)
            print("Original Probability: ", org_prob)
            current_count += 1
            return protect_image_mitm(image_path, output_folder, level_count, current_count)
    except Exception as e:
        print(f"Error processing image {image_path}: {e}")
        return None
