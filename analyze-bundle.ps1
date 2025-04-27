# PowerShell script to build and analyze the bundle

# Clear the previous build if it exists
if (Test-Path "dist") {
    Remove-Item -Path "dist" -Recurse -Force
    Write-Host "Cleared previous build"
}

# Build the project in production mode
Write-Host "Building project in production mode..."
npm run build

# Check if the build was successful
if (-not (Test-Path "dist")) {
    Write-Host "Build failed! Check for errors above." -ForegroundColor Red
    exit 1
}

Write-Host "Build completed successfully!" -ForegroundColor Green
Write-Host "Bundle analysis report generated at dist/stats.html"

# Calculate total bundle size
$jsFiles = Get-ChildItem -Path "dist\assets" -Filter "*.js" -Recurse
$cssFiles = Get-ChildItem -Path "dist\assets" -Filter "*.css" -Recurse

$totalJsSize = ($jsFiles | Measure-Object -Property Length -Sum).Sum
$totalCssSize = ($cssFiles | Measure-Object -Property Length -Sum).Sum
$totalSize = $totalJsSize + $totalCssSize

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

Write-Host "`nBundle Size Summary:"
Write-Host "====================="
Write-Host "JavaScript: $(Format-FileSize $totalJsSize)"
Write-Host "CSS: $(Format-FileSize $totalCssSize)"
Write-Host "Total: $(Format-FileSize $totalSize)"

# List the largest files
Write-Host "`nLargest Bundle Files:"
Write-Host "===================="
$allFiles = $jsFiles + $cssFiles | Sort-Object Length -Descending | Select-Object -First 5
foreach ($file in $allFiles) {
    Write-Host "$($file.Name) - $(Format-FileSize $file.Length)"
}

Write-Host "`nOpen dist/stats.html in your browser for a detailed visualization of the bundle." 