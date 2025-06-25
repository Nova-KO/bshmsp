# Vercel Serverless Contact Form Setup Guide

## Overview
This guide will help you set up a professional contact form using Vercel Serverless Functions and Resend for email delivery. Your contact form will handle submissions securely without any third-party redirects.

## ✅ **Step 1: Create Resend Account (2 minutes)**

1. **Sign up at [resend.com](https://resend.com)**
2. **Verify your email** and complete account setup
3. **Free tier includes**: 100 emails/month, 3,000 emails in first month

## ✅ **Step 2: Get Resend API Key (1 minute)**

1. **Go to Resend Dashboard** → [API Keys](https://resend.com/api-keys)
2. **Click "Create API Key"**
3. **Name it**: "BSH Technologies Contact Form"
4. **Copy the API key** (starts with `re_`)

## ✅ **Step 3: Set up Domain (Optional but Recommended)**

**Option A: Use Resend's Domain (Quick Start)**
- Use: `contact@resend.dev` as the "from" email
- **Pros**: Works immediately
- **Cons**: Shows "resend.dev" instead of your domain

**Option B: Add Your Own Domain (Recommended for Production)**
1. **In Resend Dashboard** → [Domains](https://resend.com/domains)
2. **Click "Add Domain"**
3. **Enter your domain**: `bshtechnologies.com`
4. **Follow DNS verification steps**
5. **Use**: `contact@bshtechnologies.com` as the "from" email

## ✅ **Step 4: Update Email Configuration**

In `api/contact.js`, update line 85:

```javascript
// For testing (quick start):
from: 'BSH Technologies <contact@resend.dev>',

// For production (your domain):
from: 'BSH Technologies <contact@bshtechnologies.com>',
```

And update line 86 with your actual email:

```javascript
to: ['your-actual-email@domain.com'], // Replace with your real email
```

## ✅ **Step 5: Deploy to Vercel**

### **Option A: Vercel Dashboard (Recommended)**

1. **Go to [vercel.com](https://vercel.com) and sign in**
2. **Click "Add New" → "Project"**
3. **Import your GitHub repository**
4. **Configure project**:
   - Project Name: `bsh-technologies-website`
   - Framework Preset: `Other`
   - Root Directory: `./`
   - Build Command: (leave empty)
   - Output Directory: (leave empty)

### **Option B: Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from your project directory
cd /path/to/your/project
vercel

# Follow the prompts
```

## ✅ **Step 6: Add Environment Variables**

**In Vercel Dashboard:**

1. **Go to your project** → **Settings** → **Environment Variables**
2. **Add new variable**:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_your_api_key_here` (the key you copied from Resend)
   - **Environment**: All (Production, Preview, Development)
3. **Click "Save"**

**Important**: After adding environment variables, redeploy your project for changes to take effect.

## ✅ **Step 7: Test Your Contact Form**

1. **Visit your deployed site**: `https://your-project.vercel.app/contact.html`
2. **Fill out the contact form**
3. **Submit and verify**:
   - Form shows success message
   - You receive email in your configured inbox
   - Check spam folder if needed

## 🎯 **What's Included**

### **Enhanced Features:**
- ✅ **Input validation** - Name, email, and message required
- ✅ **Email format validation** - Real-time feedback
- ✅ **XSS protection** - Input sanitization
- ✅ **Rate limiting** - Prevents spam
- ✅ **Error handling** - Graceful failure recovery
- ✅ **CORS support** - Cross-origin requests
- ✅ **Professional emails** - HTML formatted with styling
- ✅ **Form animations** - Enhanced user experience

### **Security Features:**
- ✅ **Environment variables** - API keys never exposed
- ✅ **Input sanitization** - Prevents malicious content
- ✅ **Length validation** - Prevents abuse
- ✅ **Error logging** - Monitor issues without exposing details

## 🔧 **Customization**

### **Change Email Template**
Edit `api/contact.js` lines 45-75 to customize the email HTML template.

### **Modify Form Fields**
Add/remove fields in both:
- `contact.html` (form fields)
- `api/contact.js` (field processing)

### **Update Email Recipients**
Modify line 86 in `api/contact.js`:

```javascript
to: ['info@bshtechnologies.com', 'sales@bshtechnologies.com'], // Multiple recipients
```

## 🚨 **Troubleshooting**

### **Form Not Submitting**
1. Check browser console for JavaScript errors
2. Verify `/api/contact` endpoint is accessible
3. Check Vercel deployment logs

### **Emails Not Sending**
1. Verify `RESEND_API_KEY` environment variable is set
2. Check Resend dashboard for API usage/errors
3. Verify "from" email domain is authenticated
4. Check spam folder in recipient email

### **Environment Variables Not Working**
1. Ensure variable name is exactly `RESEND_API_KEY`
2. Redeploy after adding environment variables
3. Check Vercel project settings

### **CORS Errors**
The serverless function includes CORS headers. If you still see errors:
1. Clear browser cache
2. Check if you're testing from the correct domain
3. Verify the function is deployed correctly

## 📊 **Monitoring**

### **Vercel Analytics**
- Monitor function invocations in Vercel dashboard
- Check response times and error rates

### **Resend Analytics**
- Track email delivery rates
- Monitor API usage and limits

### **Form Analytics**
Add Google Analytics events to track form submissions:

```javascript
// Add to contact form JavaScript after successful submission
gtag('event', 'form_submit', {
  'event_category': 'contact',
  'event_label': 'contact_form'
});
```

## 🎉 **You're All Set!**

Your contact form is now:
- ✅ **Professional** - Users never leave your domain
- ✅ **Secure** - Protected against common attacks
- ✅ **Scalable** - Handles unlimited submissions
- ✅ **Reliable** - Enterprise-grade infrastructure
- ✅ **Free** - No cost for typical usage volumes

For support or questions, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [BSH Technologies Support](mailto:info@bshtechnologies.com)

---

**Estimated setup time: 15 minutes**
**Technical difficulty: Medium** 