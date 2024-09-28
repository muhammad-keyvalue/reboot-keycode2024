import argparse
import os
import json
import shutil

from mitm_attack import protect_image_mitm
from res import evaluate_image
from poison_image import protect_image


def process_image(image_path, output_image_path, protect_func):
    if os.path.exists(output_image_path):
        os.remove(output_image_path)
    return protect_func(image_path, output_image_path)


def main():
    parser = argparse.ArgumentParser(description="Process an image.")
    parser.add_argument(
        "--image", help="Path to the input image", default="images/dog.png"
    )
    parser.add_argument(
        "--output_image_path", help="Path to save the output images", default="images"
    )
    parser.add_argument(
        "--json_path", help="Path to save the JSON file", default="json"
    )
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
    level_counts = [1, 2]

    org_id, org_prb = evaluate_image(image_path)

    base_url = "http://localhost:3000/files/"

    destination = f"{image_folder}/{image_name}{image_extension}"

    try:
        shutil.copy(image_path, destination)
        print(f"File copied from {image_path} to {destination}")
    except Exception as e:
        print(f"Error copying file: {e}")

    json_data = [
        {
            "imageName": f"{image_name}{image_extension}",
            "downloadUrl": f"{base_url}{image_name}{image_extension}",
            "detectionObject": org_id,
            "detectionRate": org_prb,
        }
    ]

    protect_funcs = [protect_image, protect_image_mitm]
    for i, protect_func in enumerate(protect_funcs, start=1):
        output_image_name = f"{image_name}_{i}{image_extension}"
        output_image_path = os.path.join(image_folder, output_image_name)
        current_id, current_prob = process_image(
            image_path, output_image_path, protect_func
        )

        json_data.append(
            {
                "imageName": f"{image_name}{image_extension}",
                "downloadUrl": output_image_path,
                "detectedObject": current_id,
                "detectionRate": current_prob,
            }
        )

    json_output_path = os.path.join(json_folder, f"{image_name}.json")
    with open(json_output_path, "w") as json_file:
        json.dump(json_data, json_file, indent=2)


if __name__ == "__main__":
    main()
