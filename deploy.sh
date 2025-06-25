#!/bin/bash

# BSH Technologies Website Deployment Script
# This script helps deploy the website to Vercel

echo "🚀 BSH Technologies Website Deployment"
echo "======================================="

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    echo "   git remote add origin <your-repo-url>"
    echo "   git push -u origin main"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
else
    echo "✅ Vercel CLI is already installed"
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Uncommitted changes detected. Committing changes..."
    git add .
    git commit -m "Auto-commit before deployment"
    git push
else
    echo "✅ Repository is clean"
fi

echo ""
echo "🔧 Pre-deployment checklist:"
echo "1. Have you set up your Formspree account? (https://formspree.io)"
echo "2. Have you replaced YOUR_FORM_ID in contact.html with your actual form ID?"
echo "3. Have you pushed your code to GitHub?"
echo ""

read -p "Continue with deployment? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 1
fi

echo ""
echo "🚀 Starting Vercel deployment..."

# Deploy to Vercel
vercel --prod

echo ""
echo "✅ Deployment completed!"
echo ""
echo "📋 Post-deployment tasks:"
echo "1. Test the contact form on your live site"
echo "2. Verify all pages load correctly"
echo "3. Check that images and assets load properly"
echo "4. Configure custom domain (if needed)"
echo ""
echo "📚 Need help? Check DEPLOYMENT.md for detailed instructions" 