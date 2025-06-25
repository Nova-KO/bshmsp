# 🔑 Resend API Configuration

## Your Project Details
- **Project URL**: `https://bshmsp.vercel.app`
- **Resend API Key**: `re_PtB3Fuof_EVDcGCufxZ4yiFjfTrNsTEBH`

## ⚡ Quick Setup Instructions

### Step 1: Add Environment Variable to Existing Project
1. **Go to**: [vercel.com](https://vercel.com) → **bshmsp** project → **Settings** → **Environment Variables**
2. **Click**: "Add New"
3. **Enter**:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_PtB3Fuof_EVDcGCufxZ4yiFjfTrNsTEBH`
   - **Environment**: Select "All" (Production, Preview, Development)
4. **Click**: "Save"
5. **Redeploy**: Go to "Deployments" → Click "..." on latest → "Redeploy"

### Step 2: Test Your Contact Form
1. **Visit**: `https://bshmsp.vercel.app/test-contact-form.html`
2. **Fill out** the test form
3. **Submit** and verify success message
4. **Check email** at: `info@bshtechnologies.com` (and spam folder)

### Step 3: Test Production Contact Page
1. **Visit**: `https://bshmsp.vercel.app/contact.html`
2. **Try the beautiful contact form**
3. **Verify it works perfectly**

## 🎯 Your Live URLs

✅ **Main Contact Page**: `https://bshmsp.vercel.app/contact.html`  
✅ **Test Page**: `https://bshmsp.vercel.app/test-contact-form.html`  
✅ **Homepage**: `https://bshmsp.vercel.app`  

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
- Check Resend dashboard for delivery logs at [resend.com](https://resend.com)

**Form errors?**
- Check browser console for JavaScript errors
- Verify environment variable is set in Vercel
- Test with the simpler test page first: `https://bshmsp.vercel.app/test-contact-form.html`

## ✅ Success Checklist

- [ ] API key added to Vercel environment variables
- [ ] Project redeployed after adding API key
- [ ] Test form at `https://bshmsp.vercel.app/test-contact-form.html` works
- [ ] Email received at info@bshtechnologies.com
- [ ] Main contact page at `https://bshmsp.vercel.app/contact.html` working

## 🎉 Final Steps

1. **Add the API key** to your Vercel project (Step 1 above)
2. **Test the form** - you should receive emails immediately
3. **Update your marketing** - your contact form is now live!

**Your professional serverless contact form is ready!** 🚀 