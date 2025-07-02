#!/bin/bash

echo "🚀 VERIFYING DEPLOYMENT STATUS..."
echo "=================================="

# Check robots.txt
echo "✅ Checking robots.txt for correct sitemap URL..."
curl -s https://bshmsp-lovat.vercel.app/robots.txt | grep -q "bshmsp-lovat.vercel.app" && echo "✅ robots.txt updated correctly" || echo "❌ robots.txt needs updating"

# Check sitemap.xml  
echo "✅ Checking sitemap.xml for correct domain..."
curl -s https://bshmsp-lovat.vercel.app/sitemap.xml | grep -q "bshmsp-lovat.vercel.app" && echo "✅ sitemap.xml updated correctly" || echo "❌ sitemap.xml needs updating"

# Check homepage canonical URL
echo "✅ Checking homepage canonical URL..."
curl -s https://bshmsp-lovat.vercel.app/ | grep -q 'canonical.*bshmsp-lovat.vercel.app' && echo "✅ Canonical URL updated correctly" || echo "❌ Canonical URL needs updating"

# Check site status
echo "✅ Checking site availability..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://bshmsp-lovat.vercel.app/)
if [ "$STATUS" = "200" ]; then
    echo "✅ Site is live and responding (HTTP $STATUS)"
else
    echo "❌ Site issue (HTTP $STATUS)"
fi

echo ""
echo "🎉 DEPLOYMENT VERIFICATION COMPLETE!"
echo "Site URL: https://bshmsp-lovat.vercel.app" 