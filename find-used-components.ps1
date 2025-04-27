# PowerShell script to find used UI components

# Paths
$uiDir = Join-Path $PSScriptRoot "src\components\ui"
$srcDir = Join-Path $PSScriptRoot "src"

# Get all UI component files
$uiComponentFiles = Get-ChildItem -Path $uiDir -Filter "*.tsx" | 
    ForEach-Object { $_.BaseName }

Write-Host "Found $($uiComponentFiles.Count) UI components"

$usedComponents = @()
$unusedComponents = @()

# Check usage for each component
foreach ($component in $uiComponentFiles) {
    Write-Host "Checking $component..." -NoNewline
    
    # Search for imports of this component
    $matchPattern = "from [""'].*$component[""']|[""']@/components/ui/$component[""']"
    $excludePattern = "$component.tsx"
    
    $matches = Select-String -Path "$srcDir\**\*.tsx", "$srcDir\**\*.jsx", "$srcDir\**\*.ts", "$srcDir\**\*.js" -Pattern $matchPattern |
        Where-Object { $_.Path -notmatch $excludePattern }
    
    if ($matches.Count -gt 0) {
        Write-Host "USED" -ForegroundColor Green
        $usedComponents += $component
    } else {
        Write-Host "UNUSED" -ForegroundColor Yellow
        $unusedComponents += $component
    }
}

# Report results
Write-Host "`nComponent Usage Report:"
Write-Host "======================"

Write-Host "`nUsed Components ($($usedComponents.Count)):"
Write-Host ($usedComponents -join ", ")

Write-Host "`nPotentially Unused Components ($($unusedComponents.Count)):"
Write-Host ($unusedComponents -join ", ")

# Save results to files
$usedComponents | ConvertTo-Json | Set-Content -Path "used-components.json"
$unusedComponents | ConvertTo-Json | Set-Content -Path "unused-components.json"

Write-Host "`nReports saved to used-components.json and unused-components.json" 