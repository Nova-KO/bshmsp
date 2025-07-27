# 🔗 Sanity Connection Setup Guide

## Current Status: ⚠️ **Partially Connected**

Your admin system is **partially connected** to Sanity. Here's what you need to do to complete the connection:

## 🚀 **Step 1: Get Your Sanity API Token**

### **Option A: Use Existing Project**
If you already have a Sanity project with ID `w38otuoh`:

1. **Go to**: https://www.sanity.io/manage
2. **Find your project** (ID: `w38otuoh`)
3. **Click on the project**
4. **Go to API settings** → **Tokens**
5. **Create a new token**:
   - Name: `BSH Admin Token`
   - Permissions: `Editor` (or `Write`)
   - **Copy the token** (starts with `sk...`)

### **Option B: Create New Project**
If you don't have a Sanity project:

1. **Go to**: https://sanity.io
2. **Sign up/Login**
3. **Create new project**:
   - Name: `BSH Technologies CMS`
   - Dataset: `production`
   - Template: `Clean project`
4. **Get your Project ID** from the URL
5. **Create API token** as above

## 🔧 **Step 2: Update Configuration**

### **Update Project ID (if needed)**
If you created a new project, update the Project ID in these files:

1. **`js/sanity-config.js`**:
   ```javascript
   projectId: 'YOUR_NEW_PROJECT_ID', // Replace w38otuoh
   ```

2. **`js/sanity-client-browser.js`**:
   ```javascript
   projectId: 'YOUR_NEW_PROJECT_ID', // Replace w38otuoh
   ```

### **Add Your API Token**
Update **`js/sanity-config.js`**:
```javascript
const SANITY_CONFIG = {
    projectId: 'w38otuoh', // or your new project ID
    dataset: 'production',
    apiVersion: '2023-10-01',
    token: 'sk...' // Replace with your actual token
};
```

## 🧪 **Step 3: Test the Connection**

### **Test Admin Dashboard**
1. **Go to**: https://bshtechnologies.in/admin-login.html
2. **Login**: Username `admin`, Password `bsh2024`
3. **Try to add a job** - it should now work!

### **Test Career Page**
1. **Go to**: https://bshtechnologies.in/career.html
2. **Jobs should load** from Sanity (if any exist)

## 🔍 **Verification Checklist**

- ✅ **Admin login works**
- ✅ **Can add new jobs**
- ✅ **Can edit existing jobs**
- ✅ **Can delete jobs**
- ✅ **Jobs appear on career page**
- ✅ **No console errors**

## 🆘 **Troubleshooting**

### **"Failed to create job" Error**
- Check your API token is correct
- Verify project ID matches your Sanity project
- Ensure token has "Editor" permissions

### **"No jobs found" on Career Page**
- Check if jobs are marked as "Published" in admin
- Verify Sanity project has the correct schema
- Check browser console for API errors

### **Admin Dashboard Not Loading**
- Check if you're logged in
- Verify session hasn't expired
- Try refreshing the page

## 🎯 **Quick Test Job**

Once connected, try adding this test job:

**Title**: `Test Developer Intern`
**Description**: `This is a test job posting to verify the Sanity connection.`
**Requirements**: 
- `Basic programming knowledge`
- `Eagerness to learn`
- `Good communication skills`
**Skills**: `JavaScript`, `HTML`, `CSS`
**Location**: `Remote (India)`
**Duration**: `3 months`
**Published**: ✅ Check this box

## 📞 **Need Help?**

If you're still having issues:

1. **Check browser console** for error messages
2. **Verify Sanity project** exists and is accessible
3. **Test API token** in Sanity's API explorer
4. **Contact support** with specific error messages

## 🎉 **Success Indicators**

When everything is working:
- ✅ Admin dashboard loads without errors
- ✅ Can create jobs successfully
- ✅ Jobs appear on career page
- ✅ Can edit and delete jobs
- ✅ No "Failed to load" messages

**Once you add your Sanity API token, your admin system will be fully connected and functional!** 🚀 