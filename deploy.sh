#!/bin/bash
# Quick deployment script for Apple Standby Clock

echo "🚀 Apple Standby Clock - Quick Deploy"
echo "======================================"

# Check if we're in the right directory
if [ ! -f "README.md" ] || [ ! -d "web-app" ] || [ ! -d "browser-extension" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Update version numbers
echo "📝 Updating version numbers..."
read -p "Enter new version (e.g., 1.0.1): " VERSION

# Update web-app manifest
sed -i "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" web-app/manifest.json

# Update extension manifest  
sed -i "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" browser-extension/manifest.json

echo "✅ Version updated to $VERSION"

# Git operations
echo "📦 Committing changes..."
git add .
git commit -m "v$VERSION: Ready for deployment"
git tag "v$VERSION"

echo "🌐 Pushing to GitHub (this will trigger web app deployment)..."
git push origin main --tags

echo "📋 Next steps:"
echo "1. ✅ Web app will deploy automatically to GitHub Pages"
echo "2. 🔌 For extension: create package with 'cd browser-extension && zip -r extension.zip . -x \"*.pem\" \"*.crx\"'"
echo "3. 🌟 Upload to Chrome Web Store developer console"
echo ""
echo "🎉 Deployment initiated! Check GitHub Actions for web app status."
