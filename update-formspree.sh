#!/bin/bash

# BSH Technologies - Update Formspree Form ID Script
# Usage: ./update-formspree.sh YOUR_ACTUAL_FORM_ID

if [ $# -eq 0 ]; then
    echo "❌ Error: Please provide your Formspree Form ID"
    echo ""
    echo "Usage: ./update-formspree.sh YOUR_FORM_ID"
    echo ""
    echo "Example: ./update-formspree.sh xrgjyqpw"
    echo ""
    echo "To get your Form ID:"
    echo "1. Go to formspree.io and create your form"
    echo "2. Copy the form endpoint (e.g., https://formspree.io/f/xrgjyqpw)"
    echo "3. Use the ID after /f/ (e.g., xrgjyqpw)"
    exit 1
fi

FORM_ID=$1

echo "🔄 Updating Formspree Form ID..."
echo "📝 Form ID: $FORM_ID"

# Check if contact.html exists
if [ ! -f "contact.html" ]; then
    echo "❌ Error: contact.html not found in current directory"
    exit 1
fi

# Create backup
cp contact.html contact.html.backup
echo "💾 Backup created: contact.html.backup"

# Update the form ID
sed -i.bak "s/YOUR_FORM_ID/$FORM_ID/g" contact.html

# Check if replacement was successful
if grep -q "f/$FORM_ID" contact.html; then
    echo "✅ Successfully updated Formspree Form ID!"
    echo "📄 File updated: contact.html"
    echo ""
    echo "Next steps:"
    echo "1. Test your form locally"
    echo "2. Commit and push to GitHub:"
    echo "   git add contact.html"
    echo "   git commit -m 'Update Formspree form ID'"
    echo "   git push origin main"
    echo "3. Deploy to Vercel"
    
    # Clean up temporary backup file
    rm contact.html.bak
else
    echo "❌ Error: Failed to update Form ID"
    echo "Please manually update contact.html line 90"
    # Restore from backup
    mv contact.html.backup contact.html
    exit 1
fi 