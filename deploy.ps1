# Quick deployment script for Apple Standby Clock
# PowerShell version for Windows

Write-Host "🚀 Apple Standby Clock - Quick Deploy" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

# Check if we're in the right directory
if (-not (Test-Path "README.md") -or -not (Test-Path "web-app") -or -not (Test-Path "browser-extension")) {
    Write-Host "❌ Error: Please run this script from the project root directory" -ForegroundColor Red
    exit 1
}

# Update version numbers
Write-Host "📝 Updating version numbers..." -ForegroundColor Yellow
$version = Read-Host "Enter new version (e.g., 1.0.1)"

# Update web-app manifest
$webManifest = Get-Content "web-app/manifest.json" -Raw
$webManifest = $webManifest -replace '"version": "[^"]*"', "`"version`": `"$version`""
Set-Content "web-app/manifest.json" $webManifest

# Update extension manifest
$extManifest = Get-Content "browser-extension/manifest.json" -Raw
$extManifest = $extManifest -replace '"version": "[^"]*"', "`"version`": `"$version`""
Set-Content "browser-extension/manifest.json" $extManifest

Write-Host "✅ Version updated to $version" -ForegroundColor Green

# Git operations
Write-Host "📦 Committing changes..." -ForegroundColor Yellow
git add .
git commit -m "v$version`: Ready for deployment"
git tag "v$version"

Write-Host "🌐 Pushing to GitHub (this will trigger web app deployment)..." -ForegroundColor Yellow
git push origin main --tags

Write-Host "`n📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. ✅ Web app will deploy automatically to GitHub Pages" -ForegroundColor Green
Write-Host "2. 🔌 For extension: cd browser-extension && Compress-Archive -Path * -DestinationPath extension.zip -Exclude *.pem,*.crx" -ForegroundColor Yellow
Write-Host "3. 🌟 Upload to Chrome Web Store developer console" -ForegroundColor Yellow
Write-Host ""
Write-Host "🎉 Deployment initiated! Check GitHub Actions for web app status." -ForegroundColor Green
