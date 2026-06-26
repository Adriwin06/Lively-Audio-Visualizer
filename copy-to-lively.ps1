# PowerShell script to copy visualizer files to the active Lively Wallpaper folder

$Source = Join-Path $PSScriptRoot "src\*"
$Destination = "C:\Users\adri1\AppData\Local\Packages\12030rocksdanister.LivelyWallpaper_97hta09mmv6hy\LocalCache\Local\Lively Wallpaper\Library\wallpapers\t3cfmlr4.wsg"

Write-Host "Copying files from source: $Source"
Write-Host "To destination: $Destination"

# Ensure destination directory exists (it should, but just in case)
if (-not (Test-Path -Path $Destination)) {
    Write-Warning "Destination folder does not exist! Creating it..."
    New-Item -ItemType Directory -Path $Destination -Force | Out-Null
}

# Copy files recursively, forcing overwrite of existing files
Copy-Item -Path $Source -Destination $Destination -Recurse -Force

Write-Host "Successfully copied all files! Please refresh or re-select the wallpaper in Lively." -ForegroundColor Green
