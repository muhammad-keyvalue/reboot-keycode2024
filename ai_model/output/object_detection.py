from transformers import DetrImageProcessor, DetrForObjectDetection
import torch
from PIL import Image
import requests
import sys
def detect_object(image_path):
    image = image_path

    # you can specify the revision tag if you don't want the timm dependency
    processor = DetrImageProcessor.from_pretrained("facebook/detr-resnet-50", revision="no_timm")
    model = DetrForObjectDetection.from_pretrained("facebook/detr-resnet-50", revision="no_timm")

    inputs = processor(images=image, return_tensors="pt")
    outputs = model(**inputs)

    # convert outputs (bounding boxes and class logits) to COCO API
    # let's only keep detections with score > 0.9
    target_sizes = torch.tensor([image.size[::-1]])
    results = processor.post_process_object_detection(outputs, target_sizes=target_sizes, threshold=0.9)[0]

    if len(results["boxes"]) > 0:
        first_box = results["boxes"][0].tolist()
        first_box = [round(i, 2) for i in first_box]
        return first_box
    else:
        return None
    

        