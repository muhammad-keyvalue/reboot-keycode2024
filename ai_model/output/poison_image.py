import os
import numpy as np
from PIL import Image
from art.attacks.evasion import (
    ProjectedGradientDescent,
    DeepFool,
    SaliencyMapMethod,
    UniversalPerturbation,
    MomentumIterativeMethod,
)
from art.estimators.classification import TensorFlowV2Classifier
from res import evaluate_image
import tensorflow as tf


def protect_image(image_path, output_folder, level_count=40, current_count=0):
    # Load and preprocess image
    org_id, org_prob = evaluate_image(image_path)
    image = Image.open(image_path).convert("RGB")

    # Resize image to 224x224 to match ResNet50's input size
    image = image.resize((224, 224))

    # Convert image to numpy array and normalize pixel values to [0, 1]
    image_np = np.array(image).astype(np.float32) / 255.0

    # Add batch dimension to make it (1, 224, 224, 3)
    image_np = np.expand_dims(image_np, axis=0)

    # Load pretrained ResNet50 model
    model = tf.keras.applications.ResNet50(
        weights="imagenet", input_shape=(224, 224, 3)
    )

    # Wrap the model for ART (Adversarial Robustness Toolbox)
    classifier = TensorFlowV2Classifier(
        model=model,
        nb_classes=1000,
        input_shape=(224, 224, 3),
        loss_object=tf.keras.losses.CategoricalCrossentropy(),
    )

    # Create a stronger PGD attack method
    attack = DeepFool(
        classifier=classifier,
        max_iter=1000,  # Increased iterations
        epsilon=1e-2,  # Increased step size for stronger perturbations
    )

    output_path = perform_attack(attack, output_folder, image_np)
    current_id, current_prob = evaluate_image(output_path)

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
        return protect_image(output_path, output_folder, level_count, current_count)


def perform_attack(attack, output_folder, image_np):
    adversarial_image = attack.generate(x=image_np)

    # Postprocess and save image
    adversarial_image = np.squeeze(adversarial_image) * 255.0
    adversarial_image = np.clip(adversarial_image, 0, 255).astype(np.uint8)
    adversarial_pil = Image.fromarray(adversarial_image)
    adversarial_pil.save(output_folder)
    return output_folder
