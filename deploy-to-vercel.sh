#!/bin/bash

# BSH Technologies - Vercel Deployment Script
# This script will deploy your serverless contact form to Vercel

echo "🚀 BSH Technologies - Vercel Deployment Script"
echo "=============================================="
echo

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository. Please run this from your project root."
    exit 1
fi

# Check for required files
echo "📋 Checking required files..."
required_files=("api/contact.js" "contact.html" "vercel.json" "SERVERLESS_SETUP.md")
missing_files=()

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        missing_files+=("$file")
    else
        echo "✅ $file"
    fi
done

if [ ${#missing_files[@]} -gt 0 ]; then
    echo "❌ Missing required files:"
    for file in "${missing_files[@]}"; do
        echo "   - $file"
    done
    exit 1
fi

echo "✅ All required files present!"
echo

# Check git status
echo "📊 Checking git status..."
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Uncommitted changes detected. Committing..."
    git add .
    git commit -m "Deploy serverless contact form to Vercel - $(date '+%Y-%m-%d %H:%M:%S')"
    echo "✅ Changes committed"
else
    echo "✅ Working directory clean"
fi

# Push to remote
echo "📤 Pushing to remote repository..."
git push origin main
if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub"
else
    echo "❌ Failed to push to GitHub. Please check your remote repository."
    exit 1
fi

echo

# Check if Vercel CLI is installed
echo "🔧 Checking Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    echo "📦 Vercel CLI not found. Installing..."
    if command -v npm &> /dev/null; then
        npm install -g vercel
        if [ $? -eq 0 ]; then
            echo "✅ Vercel CLI installed successfully"
        else
            echo "❌ Failed to install Vercel CLI"
            echo "💡 Please install manually: npm install -g vercel"
            exit 1
        fi
    else
        echo "❌ npm not found. Please install Node.js and npm first."
        echo "💡 Visit: https://nodejs.org/"
        exit 1
    fi
else
    echo "✅ Vercel CLI found"
fi

echo

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
echo "📋 You'll be prompted to:"
echo "   1. Log in to Vercel (if not already logged in)"
echo "   2. Confirm project settings"
echo "   3. Choose deployment type"
echo
echo "💡 Recommended answers:"
echo "   - Set up and deploy? [Y/n] → Y"
echo "   - Which scope? → Choose your account"
echo "   - Link to existing project? [y/N] → N (unless you have existing project)"
echo "   - What's your project's name? → bsh-technologies-website"
echo "   - In which directory is your code located? → ./"
echo

read -p "🤔 Ready to deploy? (y/N): " confirm
if [[ $confirm =~ ^[Yy]$ ]]; then
    echo "🚀 Starting deployment..."
    vercel --prod
    
    if [ $? -eq 0 ]; then
        echo
        echo "🎉 Deployment successful!"
        echo
        echo "📋 IMPORTANT NEXT STEPS:"
        echo "1️⃣  Set up your Resend API key:"
        echo "    • Go to your Vercel project dashboard"
        echo "    • Settings → Environment Variables"
        echo "    • Add: RESEND_API_KEY = (your Resend API key)"
        echo
        echo "2️⃣  Get your Resend API key at: https://resend.com/api-keys"
        echo
        echo "3️⃣  Test your contact form:"
        echo "    • Visit: https://your-project.vercel.app/test-contact-form.html"
        echo "    • Fill out and submit the form"
        echo "    • Check your email for the test message"
        echo
        echo "📖 For detailed setup: See SERVERLESS_SETUP.md"
        echo "⚡ Quick guide: See DEPLOYMENT_CHECKLIST.md"
        
    else
        echo "❌ Deployment failed. Please check the error messages above."
        echo "💡 Common issues:"
        echo "   - Not logged in to Vercel (run: vercel login)"
        echo "   - Network connectivity issues"
        echo "   - Project configuration problems"
        echo
        echo "🆘 Need help? Check SERVERLESS_SETUP.md for troubleshooting"
        exit 1
    fi
else
    echo "❌ Deployment cancelled."
    echo "💡 When you're ready, run this script again or deploy manually:"
    echo "   vercel --prod"
fi

echo
echo "🎯 Deployment script completed!"
echo "📧 Questions? Contact: info@bshtechnologies.com" 