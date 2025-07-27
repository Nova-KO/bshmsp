# 🔧 Critical Fixes Implementation Guide

This guide will help you implement the critical fixes identified in the website review.

## 🚨 **Priority 1: Configure Sanity API Token**

### **Step 1: Get Your Sanity API Token**

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Select your project (`w38otuoh`)
3. Go to **API** tab
4. Click **Create API token**
5. Name it "Admin Dashboard"
6. Select **Editor** permissions
7. Copy the token (starts with `sk...`)

### **Step 2: Update Configuration**

1. Open `js/sanity-config.js`
2. Replace `'YOUR_SANITY_TOKEN_HERE'` with your actual token:

```javascript
const SANITY_CONFIG = {
    projectId: 'w38otuoh',
    dataset: 'production',
    apiVersion: '2023-10-01',
    token: 'sk-your-actual-token-here' // ← Replace this
};
```

## 🚨 **Priority 2: Install Dependencies**

Run this command to install the required packages for authentication:

```bash
npm install
```

This will install:
- `bcryptjs` - For password hashing
- `cookie-parser` - For handling cookies

## 🚨 **Priority 3: Set Up Server-Side Authentication**

### **Step 1: Generate Password Hash**

You need to generate a hashed password for the admin account. Create a file called `generate-hash.js`:

```javascript
const bcrypt = require('bcryptjs');

async function generateHash() {
    const password = 'bsh2024'; // Your desired password
    const securityAnswer = 'blue'; // Your security answer
    
    const passwordHash = await bcrypt.hash(password, 10);
    const answerHash = await bcrypt.hash(securityAnswer, 10);
    
    console.log('Password Hash:', passwordHash);
    console.log('Security Answer Hash:', answerHash);
}

generateHash();
```

Run it:
```bash
node generate-hash.js
```

### **Step 2: Update Admin Credentials**

1. Open `api/admin-auth.js`
2. Replace the placeholder hashes with your generated hashes:

```javascript
const ADMIN_CREDENTIALS = {
    username: 'admin',
    passwordHash: 'YOUR_GENERATED_PASSWORD_HASH', // Replace this
    securityQuestion: 'What is your favorite color?',
    securityAnswerHash: 'YOUR_GENERATED_ANSWER_HASH' // Replace this
};
```

## 🚨 **Priority 4: Test the Fixes**

### **Step 1: Start the Server with Authentication**

```bash
node server-with-auth.js 8888
```

### **Step 2: Test Admin Login**

1. Go to `http://localhost:8888/admin-login.html`
2. Login with:
   - Username: `admin`
   - Password: `bsh2024`
3. Test password reset functionality

### **Step 3: Test Admin Dashboard**

1. Go to `http://localhost:8888/admin-dashboard.html`
2. Try creating a new job posting
3. Verify it works without "Failed to save job" errors

## ✅ **What's Been Fixed**

### **1. Sitemap Updated**
- ✅ Updated domain to current production URL
- ✅ Added missing pages (`career.html`, `internship-application.html`)
- ✅ Updated all lastmod dates to current date

### **2. Script Paths Standardized**
- ✅ All pages now use absolute paths (`/js/includes.js`)
- ✅ Service pages updated to use correct paths
- ✅ Consistent loading across all pages

### **3. Server-Side Authentication**
- ✅ Created secure authentication API (`/api/auth/*`)
- ✅ Password hashing with bcrypt
- ✅ Session management with cookies
- ✅ Protected admin endpoints

### **4. New Files Created**
- ✅ `api/admin-auth.js` - Authentication logic
- ✅ `api/auth.js` - API endpoints
- ✅ `server-with-auth.js` - Server with authentication
- ✅ `js/admin-auth-server.js` - Client-side auth helper

## 🔒 **Security Improvements**

1. **No More Plain Text Passwords**: All passwords are now hashed
2. **Secure Sessions**: Server-side session management
3. **HTTP-Only Cookies**: Session tokens protected from XSS
4. **Password Validation**: Minimum 8 characters required
5. **CORS Protection**: Proper headers for API endpoints

## 🚀 **Deployment**

After testing locally:

```bash
git add .
git commit -m "Implement critical fixes: Sanity token, sitemap, script paths, server-side auth"
git push origin main
vercel --prod
```

## 📞 **Need Help?**

If you encounter issues:

1. **Sanity Token Issues**: Check `QUICK_FIX_GUIDE.md`
2. **Authentication Issues**: Verify password hashes in `api/admin-auth.js`
3. **Server Issues**: Make sure all dependencies are installed
4. **Path Issues**: Verify all script paths start with `/`

---

**Your website will be much more secure and functional after implementing these fixes!** 🎉 