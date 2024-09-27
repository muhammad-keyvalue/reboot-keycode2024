#!/bin/python3
import json
import sys
import os
import random

# Check if correct number of arguments are passed
if len(sys.argv) != 2:
    print("Expected command: ./sample.sh <fileName>")
    sys.exit(1)

# Assign command line argument to variable
file_name = sys.argv[1]

# Path to the JSON file
file_path = 'src/processed/output.json'

# Check if output.json exists, if not create a new one with an empty array
if not os.path.exists(file_path):
    with open(file_path, 'w') as json_file:
        json.dump([], json_file)

# Read the existing data from output.json
with open(file_path, 'r') as json_file:
    data = json.load(json_file)

# Generate random detection rates between 50 and 100
detection_rate_first = random.randint(50, 100)
detection_rate_second = random.randint(50, 100)

# Construct URLs
base_name = file_name.split('.')[0]
url_first = f"http://localhost:3000/files/{base_name}-first.jpeg"
url_second = f"http://localhost:3000/files/{base_name}-second.jpeg"

# Create new entries
new_entries = [
    {
        "fileName": file_name,
        "downloadUrl": url_first,
        "detectionRate": detection_rate_first
    },
    {
        "fileName": file_name,
        "downloadUrl": url_second,
        "detectionRate": detection_rate_second
    }
]

# Append new entries to the existing data
data.extend(new_entries)

# Write the updated data back to output.json
with open(file_path, 'w') as json_file:
    json.dump(data, json_file, indent=4)
