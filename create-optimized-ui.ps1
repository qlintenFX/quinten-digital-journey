# PowerShell script to create an optimized UI components bundle

# Paths
$uiDir = Join-Path $PSScriptRoot "src\components\ui"
$optimizedDir = Join-Path $PSScriptRoot "src\components\ui-optimized"
$indexFile = Join-Path $optimizedDir "index.ts"

# Ensure the optimized directory exists
if (-not (Test-Path $optimizedDir)) {
    New-Item -Path $optimizedDir -ItemType Directory | Out-Null
    Write-Host "Created optimized UI directory at $optimizedDir"
} else {
    # Clear the directory
    Get-ChildItem -Path $optimizedDir -File | Remove-Item -Force
    Write-Host "Cleared existing optimized UI directory"
}

# Get the list of used components from the JSON file
$usedComponents = Get-Content -Path "used-components.json" | ConvertFrom-Json

# Add additional essential components that might be dependencies
$essentialComponents = @(
    "button", "dialog", "modal", "tabs", "toast", "card",
    "toaster", # Dependency of toast
    "switch" # Used in the layout
)

# Remove duplicates
$componentsToInclude = $essentialComponents | Select-Object -Unique

Write-Host "Including these components: $($componentsToInclude -join ", ")"

# Copy each component file to the optimized directory
foreach ($component in $componentsToInclude) {
    $sourceFile = Join-Path $uiDir "$component.tsx"
    $destFile = Join-Path $optimizedDir "$component.tsx"
    
    if (Test-Path $sourceFile) {
        Copy-Item -Path $sourceFile -Destination $destFile
        Write-Host "Copied $component.tsx"
    } else {
        Write-Host "Warning: Could not find $sourceFile" -ForegroundColor Yellow
    }
}

# Create index.ts file for easier imports
$exportStatements = $componentsToInclude | ForEach-Object {
    "export * from './$_';"
}

$exportStatements -join "`n" | Set-Content -Path $indexFile
Write-Host "Created index.ts with exports for all components"

Write-Host "`nOptimized UI bundle created successfully!"
Write-Host "To use it, update imports from '@/components/ui/component-name' to '@/components/ui-optimized/component-name'"
Write-Host "Or use '@/components/ui-optimized' for bulk imports" 