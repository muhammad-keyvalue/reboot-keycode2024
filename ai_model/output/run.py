from flip_pixel import flip_random_pixels
from poison_image import protect_image

#flip_random_pixels("bird_flipped.jpeg", "bird_flipped.jpeg", flip_percentage=0.001)
protect_image("bird.jpeg", "output",level_count=40,current_count=0)