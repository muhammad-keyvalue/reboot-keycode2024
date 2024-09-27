import random
from PIL import Image
import numpy as np

def flip_random_pixels(image_path, output_path, flip_percentage=0.001):
    # Open the image
    img = Image.open(image_path)
    img = img.convert('RGB')  # Ensure it's in RGB format

    # Convert image to numpy array for pixel manipulation
    img_array = np.array(img)

    # Get image dimensions
    height, width, _ = img_array.shape
    num_pixels = height * width

    # Determine number of pixels to flip
    num_flips = int(num_pixels * flip_percentage)

    # Randomly select pixels and flip them
    for _ in range(num_flips):
        x = random.randint(0, width - 1)
        y = random.randint(0, height - 1)

        # Flip pixel values by inverting the RGB channels (255 - value)
        img_array[y, x] = 255 - img_array[y, x]

    # Convert the numpy array back to an image
    flipped_img = Image.fromarray(img_array)

    # Save the new image
    flipped_img.save(output_path)
    print(f"Saved flipped image at {output_path}")