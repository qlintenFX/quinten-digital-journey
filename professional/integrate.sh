#!/bin/bash

# ==============================================================================
# Script to integrate generated.tsx components into a Next.js project structure
# ==============================================================================
# This script assumes the following project structure:
# professional/
# ├── generated.tsx
# └── src/
#     └── app/
#         ├── page.tsx
#         └── globals.css
#
# It will:
# 1. Create a `src/app/components` directory.
# 2. Extract and create separate files for each component (e.g., ProfileCard.tsx).
# 3. Create a `src/data.ts` file for all the mock data.
# 4. Replace the content of `src/app/page.tsx` with the main page component and its required imports.
# ==============================================================================

# --- Configuration ---
GENERATED_FILE="generated.tsx"
COMPONENTS_DIR="src/app/components"
DATA_FILE="src/data.ts"
PAGE_FILE="src/app/page.tsx"
DATA_START_MARKER="// START_DATA_SECTION"
DATA_END_MARKER="// END_DATA_SECTION"
COMPONENT_PREFIX="START_"
COMPONENT_SUFFIX="_COMPONENT"
PAGE_START_MARKER="// START_PAGE_CONTENT"
PAGE_END_MARKER="// END_PAGE_CONTENT"

echo "Starting component integration process..."

# --- Check if the generated file exists ---
if [ ! -f "$GENERATED_FILE" ]; then
    echo "Error: $GENERATED_FILE not found. Please ensure it is in the project root."
    exit 1
fi

# --- Create the components directory if it doesn't exist ---
mkdir -p "$COMPONENTS_DIR"
if [ $? -eq 0 ]; then
    echo "Created directory: $COMPONENTS_DIR"
else
    echo "Error: Failed to create $COMPONENTS_DIR."
    exit 1
fi

# --- Extract and create the data file ---
echo "Extracting mock data to $DATA_FILE..."
# Extract lines between markers and save to the data file.
awk "/$DATA_START_MARKER/,/$DATA_END_MARKER/" "$GENERATED_FILE" | \
    grep -vE "$DATA_START_MARKER|$DATA_END_MARKER" > "$DATA_FILE"
echo "Extracted data to $DATA_FILE."

# --- Extract and create component files ---
echo "Extracting components to $COMPONENTS_DIR..."

# List of components to extract based on the markers
COMPONENTS=("STAR_RATING" "PROFILE_CARD" "TECH_STACK" "WORK_PROCESS" "SERVICES" "PROJECTS" "TESTIMONIALS")
IMPORT_STATEMENTS=""

for COMPONENT_NAME in "${COMPONENTS[@]}"; do
    # Convert component name to PascalCase for filename and component reference
    FILE_NAME=""
    IFS='_' read -r -a words <<< "$COMPONENT_NAME"
    for word in "${words[@]}"; do
      FILE_NAME+="$(tr '[:lower:]' '[:upper:]' <<< "${word:0:1}")$(tr '[:upper:]' '[:lower:]' <<< "${word:1}")"
    done
    FILE_PATH="$COMPONENTS_DIR/$FILE_NAME.tsx"

    START_MARKER="// $COMPONENT_PREFIX${COMPONENT_NAME}${COMPONENT_SUFFIX}"
    END_MARKER="// END_${COMPONENT_NAME}${COMPONENT_SUFFIX}"

    # Use awk to extract the component block and save it to a new file
    awk -v start="$START_MARKER" -v end="$END_MARKER" '
    $0 == start { found=1; next }
    $0 == end { found=0 }
    found { print }
    ' "$GENERATED_FILE" > "$FILE_PATH"

    if [ -f "$FILE_PATH" ]; then
        echo "Created component: $FILE_PATH"
        # Add the import statement to our list
        IMPORT_STATEMENTS+="import { $FILE_NAME } from './components/$FILE_NAME';\n"
    else
        echo "Error: Failed to create component $FILE_PATH."
    fi
done

# Add import for data
IMPORT_STATEMENTS+="import { techStack, services, projects, workProcess, testimonials } from '../data';\n"

# --- Extract and create the main page file ---
echo "Updating $PAGE_FILE..."
# Extract the content of the main page component
PAGE_CONTENT=$(awk "/$PAGE_START_MARKER/,/$PAGE_END_MARKER/" "$GENERATED_FILE" | grep -vE "$PAGE_START_MARKER|$PAGE_END_MARKER")

# Combine the new import statements with the page content
echo -e "$IMPORT_STATEMENTS\n$PAGE_CONTENT" > "$PAGE_FILE"

echo "Integration complete! Your project should now be updated with the new home page."
echo "You can now safely remove the generated.tsx file."
