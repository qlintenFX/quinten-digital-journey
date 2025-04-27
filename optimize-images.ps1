# PowerShell script to optimize images in the public folder

# Install required packages if not already installed
if (-not (Get-Command "sharp-cli" -ErrorAction SilentlyContinue)) {
    Write-Host "Installing sharp-cli for image optimization..." -ForegroundColor Yellow
    npm install -g sharp-cli
}

# Paths
$imagesDir = Join-Path $PSScriptRoot "public\images"
$optimizedDir = Join-Path $PSScriptRoot "public\images-optimized"

# Ensure the optimized directory exists
if (-not (Test-Path $optimizedDir)) {
    New-Item -Path $optimizedDir -ItemType Directory | Out-Null
    Write-Host "Created optimized images directory at $optimizedDir"
}

# Get all image files
$imageFiles = Get-ChildItem -Path $imagesDir -Include "*.png", "*.jpg", "*.jpeg", "*.gif" -Recurse

# Process each image
$totalOriginalSize = 0
$totalOptimizedSize = 0

foreach ($image in $imageFiles) {
    $originalSize = $image.Length
    $totalOriginalSize += $originalSize
    
    $relativePath = $image.FullName.Substring($imagesDir.Length + 1)
    $outputPath = Join-Path $optimizedDir $relativePath
    
    # Create the directory if it doesn't exist
    $outputDir = Split-Path -Path $outputPath -Parent
    if (-not (Test-Path $outputDir)) {
        New-Item -Path $outputDir -ItemType Directory -Force | Out-Null
    }
    
    # Optimize based on file type
    switch -Regex ($image.Extension) {
        '\.png$' {
            # Optimize PNG
            $command = "sharp -i `"$($image.FullName)`" -o `"$outputPath`" --format=png --quality=80"
            Invoke-Expression $command
        }
        '\.jpe?g$' {
            # Optimize JPEG
            $command = "sharp -i `"$($image.FullName)`" -o `"$outputPath`" --format=jpeg --quality=80"
            Invoke-Expression $command
        }
        '\.gif$' {
            # Just copy GIF files (sharp doesn't handle GIFs well)
            Copy-Item -Path $image.FullName -Destination $outputPath -Force
        }
    }
    
    # Get optimized size
    if (Test-Path $outputPath) {
        $optimizedSize = (Get-Item $outputPath).Length
        $totalOptimizedSize += $optimizedSize
        $savings = 100 - [math]::Round(($optimizedSize / $originalSize) * 100, 2)
        
        Write-Host "Optimized: $relativePath - Saved $savings% ($(Format-FileSize $originalSize) → $(Format-FileSize $optimizedSize))"
    } else {
        Write-Host "Failed to optimize: $relativePath" -ForegroundColor Red
    }
}

# Report
$totalSavings = 100 - [math]::Round(($totalOptimizedSize / $totalOriginalSize) * 100, 2)

function Format-FileSize {
    param ([long]$Size)
    
    if ($Size -gt 1MB) {
        return "{0:N2} MB" -f ($Size / 1MB)
    } elseif ($Size -gt 1KB) {
        return "{0:N2} KB" -f ($Size / 1KB)
    } else {
        return "$Size bytes"
    }
}

Write-Host "`nImage Optimization Summary:"
Write-Host "========================="
Write-Host "Total Original Size: $(Format-FileSize $totalOriginalSize)"
Write-Host "Total Optimized Size: $(Format-FileSize $totalOptimizedSize)"
Write-Host "Total Savings: $totalSavings% ($(Format-FileSize ($totalOriginalSize - $totalOptimizedSize)))"

Write-Host "`nOptimized images are available in the public/images-optimized directory"
Write-Host "To use them, replace the /images path with /images-optimized in your code" 