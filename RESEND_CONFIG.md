# 🔑 Resend API Configuration

## Your Resend API Key
```
re_PtB3Fuof_EVDcGCufxZ4yiFjfTrNsTEBH
```

## ⚡ Quick Setup Instructions

### Step 1: Deploy to Vercel
```bash
# Commit and push
git add .
git commit -m "Deploy serverless contact form with Resend integration"
git push origin main

# Deploy to Vercel
vercel --prod
```

### Step 2: Add Environment Variable
1. **Go to**: [vercel.com](https://vercel.com) → Your Project → **Settings** → **Environment Variables**
2. **Click**: "Add New"
3. **Enter**:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_PtB3Fuof_EVDcGCufxZ4yiFjfTrNsTEBH`
   - **Environment**: Select "All" (Production, Preview, Development)
4. **Click**: "Save"
5. **Redeploy**: Go to "Deployments" → Click "..." on latest → "Redeploy"

### Step 3: Test Your Contact Form
1. **Visit**: `https://your-project.vercel.app/test-contact-form.html`
2. **Fill out** the test form
3. **Submit** and verify success message
4. **Check email** at: `info@bshtechnologies.com` (and spam folder)

## 🎯 Expected Results

✅ **Form submits successfully**  
✅ **Success message appears**  
✅ **Email arrives at info@bshtechnologies.com**  
✅ **Professional HTML formatted email**  

## 🔧 Email Configuration

**Current Setup**:
- **From**: BSH Technologies <contact@resend.dev>
- **To**: info@bshtechnologies.com
- **Subject**: New Contact: [Name] - [Organization]

**To use your own domain** (optional):
1. Add domain in Resend dashboard
2. Update `api/contact.js` line 85: `contact@bshtechnologies.com`

## 🚨 Troubleshooting

**No emails received?**
- Check spam/junk folder
- Verify API key is exactly: `re_PtB3Fuof_EVDcGCufxZ4yiFjfTrNsTEBH`
- Check Resend dashboard for delivery logs

**Form errors?**
- Check browser console for JavaScript errors
- Verify environment variable is set in Vercel
- Test with the simpler `test-contact-form.html` page

## ✅ Success Checklist

- [ ] API key added to Vercel environment variables
- [ ] Project redeployed after adding API key
- [ ] Test form submitted successfully
- [ ] Email received at info@bshtechnologies.com
- [ ] Contact page working on live site

**You're ready to go live!** 🚀 