import os
import numpy as np
from PIL import Image
from art.attacks.evasion import ProjectedGradientDescent, DeepFool, SaliencyMapMethod, UniversalPerturbation
from art.estimators.classification import TensorFlowV2Classifier
from unet import blend
from res import evaluate_image
import tensorflow as tf

def protect_image(image_path, output_folder,level_count=40,current_count=0):
    # Load and preprocess image
    org_id,org_prob = evaluate_image(image_path) 
    image = Image.open(image_path).convert('RGB')

    # Resize image to 224x224 to match ResNet50's input size
    image = image.resize((224, 224))

    # Convert image to numpy array and normalize pixel values to [0, 1]
    image_np = np.array(image).astype(np.float32) / 255.0

    # Add batch dimension to make it (1, 224, 224, 3)
    image_np = np.expand_dims(image_np, axis=0)

    # Load pretrained ResNet50 model
    model = tf.keras.applications.ResNet50(weights='imagenet', input_shape=(224, 224, 3))

    # Wrap the model for ART (Adversarial Robustness Toolbox)
    classifier = TensorFlowV2Classifier(
        model=model,
        nb_classes=1000,
        input_shape=(224, 224, 3),
        loss_object=tf.keras.losses.CategoricalCrossentropy()
    )

    # Create a stronger PGD attack method
    # attack = ProjectedGradientDescent(
    #     estimator=classifier,
    #     norm=np.inf,             # Use infinity norm for perturbations
    #     eps=0.3,                 # Increased attack strength (larger epsilon)
    #     eps_step=0.05,           # Increased step size
    #     max_iter=100,            # Increased number of iterations
    #     targeted=False
    # )

    attack = DeepFool(
        classifier=classifier,
        max_iter=1000,  # Increased iterations
        epsilon=1e-2       # Increased step size for stronger perturbations
    )    #attack = SaliencyMapMethod(classifier=classifier, theta=0.1, gamma=0.1)

    output_path=perform_attack(attack, image_path, output_folder,image_np)
    #adversarial_image = deepfool.generate(x=image_np)

    # Apply adversarial perturbation
   
    #blend(image_path, output_path)
    current_id,current_prob = evaluate_image(output_path)
    if(current_id!=org_id or current_count>level_count):
        print("The image is protected")
    else:
         print("Current Probability: ",current_prob)
         print("Original Probability: ",org_prob)
         current_count+=1
         protect_image(output_path, output_folder,level_count,current_count)

def perform_attack(attack, image_path, output_folder,image_np):
     adversarial_image = attack.generate(x=image_np)

    # Postprocess and save image
     adversarial_image = np.squeeze(adversarial_image) * 255.0
     adversarial_image = np.clip(adversarial_image, 0, 255).astype(np.uint8)
     adversarial_pil = Image.fromarray(adversarial_image)
     filename = os.path.basename(image_path)
     output_path = os.path.join(output_folder, filename)
     adversarial_pil.save(output_path)
     return output_path         

   