import argparse
import os
import json
from flip_pixel import flip_random_pixels
from poison_image import protect_image

def main():
    parser = argparse.ArgumentParser(description="Process an image.")
    parser.add_argument('--image', help="Path to the input image", default="images/dog.png")
    parser.add_argument('--output_image_path', help="Path to save the output images",default="images")
    parser.add_argument('--json_path', help="Path to save the JSON file",default="json")
    args = parser.parse_args()

    if not args.image:
        raise ValueError("Image path cannot be null")

    image_path = args.image
    image_folder = args.output_image_path
    json_folder = args.json_path
    os.makedirs(image_folder, exist_ok=True)
    os.makedirs(json_folder, exist_ok=True)

    # Extract the file name without extension
    image_name = os.path.splitext(os.path.basename(image_path))[0]
    image_extension = os.path.splitext(image_path)[1]

    # Define the level counts
    level_counts = [2, 5, 8]

    json_data = []

    for i, level_count in enumerate(level_counts, start=1):
        output_image_name = f"{image_name}_{i}{image_extension}"
        output_image_path = os.path.join(image_folder, output_image_name)
        protect_image(image_path, output_image_path, level_count=level_count, current_count=0)

        json_data.append({
            "imageName": f"{image_name}{image_extension}",
            "downloadUrl": output_image_path,
            "detectionRate": level_count
        })

    json_output_path = os.path.join(json_folder, f"{image_name}.json")
    with open(json_output_path, 'w') as json_file:
        json.dump(json_data, json_file, indent=2)

if __name__ == "__main__":
    main()