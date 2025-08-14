#!/bin/bash

# integrate.sh
# This script takes the generated.tsx file, splits it into components and data files,
# and integrates them into the src/app directory of a Next.js project.

echo "Starting integration process..."

# Define file paths
GENERATED_FILE="generated.tsx"
DATA_DIR="src/data"
COMPONENTS_DIR="src/app/components"
PAGE_FILE="src/app/page.tsx"

# --- Step 1: Validate prerequisites ---
if [ ! -f "$GENERATED_FILE" ]; then
    echo "Error: The file $GENERATED_FILE does not exist. Please place it at the root of your project."
    exit 1
fi
echo "Found $GENERATED_FILE. Proceeding."

# --- Step 2: Create necessary directories ---
echo "Creating required directories..."
mkdir -p "$DATA_DIR"
mkdir -p "$COMPONENTS_DIR"

# --- Step 3: Extract data and save to data.ts ---
echo "Extracting data into $DATA_DIR/data.ts..."
awk '
  /START_DATA/ { in_data=1; next }
  /END_DATA/ { in_data=0; }
  in_data { print }
' "$GENERATED_FILE" > "$DATA_DIR/data.ts"
echo "Data extraction complete."

# --- Step 4: Extract components and save them as individual files ---
echo "Extracting components into $COMPONENTS_DIR/..."
# List of components to extract
COMPONENTS=("StarRating" "ProfileCard" "TechStack" "WorkProcess" "Services" "Projects" "Testimonials")

for COMPONENT in "${COMPONENTS[@]}"; do
    echo "  - Processing $COMPONENT..."
    awk -v component_name="$COMPONENT" '
        /START_COMPONENT/ && $3 == component_name { in_component=1; next }
        /END_COMPONENT/ && $3 == component_name { in_component=0; }
        in_component { print }
    ' "$GENERATED_FILE" > "$COMPONENTS_DIR/$COMPONENT.tsx"
done

# Add a specific import to the Testimonials component
echo "Adding import statement to Testimonials.tsx..."
echo "import { StarRating } from './StarRating';" | cat - "$COMPONENTS_DIR/Testimonials.tsx" > temp && mv temp "$COMPONENTS_DIR/Testimonials.tsx"

echo "All components extracted."

# --- Step 5: Extract the main page content and replace existing page.tsx ---
echo "Replacing $PAGE_FILE with the new home page content..."
# Extract the main page content
awk '
  /START_MAIN_PAGE/ { in_page=1; next }
  /END_MAIN_PAGE/ { in_page=0; }
  in_page { print }
' "$GENERATED_FILE" > "$PAGE_FILE"

# Add all necessary import statements to the new page.tsx file
echo "Adding import statements to page.tsx..."
IMPORT_STATEMENTS=$(cat <<EOF
import React from 'react';
import { ProfileCard } from './components/ProfileCard';
import { TechStack } from './components/TechStack';
import { Services } from './components/Services';
import { WorkProcess } from './components/WorkProcess';
import { Projects } from './components/Projects';
import { Testimonials } from './components/Testimonials';
import { techStack, services, projects, workProcess, testimonials } from '../data/data';
EOF
)

echo "$IMPORT_STATEMENTS" | cat - "$PAGE_FILE" > temp && mv temp "$PAGE_FILE"

echo "Home page updated successfully."

echo "Integration complete! You can now remove the generated.tsx file."
