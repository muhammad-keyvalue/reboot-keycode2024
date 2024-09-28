from checker import evaluate_image
from pixel_manipulate import flip_random_pixels
import sys
from PIL import Image
import torch

x = 0
y = 0

original_file = Image.open(sys.argv[1], "r")
prev_file = original_file
next_file = original_file

# Round 1 - find and store initial classification
orig_cat_id, orig_score = evaluate_image(original_file)
with open("imagenet_classes.txt", "r") as f:
    categories = [s.strip() for s in f.readlines()]
    print(categories[orig_cat_id], orig_score.item())

cur_cat_id = orig_cat_id
prev_score = orig_score
new_score = orig_score

while orig_cat_id == cur_cat_id:
#while new_score > float(orig_score.item()):
    next_file = flip_random_pixels(prev_file)
    print(x, y)
    cur_cat_id, new_score = evaluate_image(next_file)
    print("New score: " + str(new_score.item()) + "  Old score: " + str(prev_score.item()))
    if new_score.item() > prev_score.item():
        next_file = prev_file
    else:
        prev_score = new_score

print("New category: " + categories[cur_cat_id])
next_file.save("Output.jpg")
