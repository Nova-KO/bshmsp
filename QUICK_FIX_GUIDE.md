# 🔧 Quick Fix: Admin Dashboard Error

## 🚨 **Issue:** "Failed to save job. Please try again."

The admin dashboard is failing because the Sanity API token is not configured.

## ✅ **Solution:**

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

### **Step 3: Test**

1. Go to your admin dashboard: `/admin-dashboard.html`
2. Try creating a new job
3. It should work now!

## 🔒 **Security Note:**

- Keep your token secure
- Don't share it publicly
- The token is only used for admin operations

## 📞 **Need Help?**

If you still have issues:
1. Check browser console for detailed error messages
2. Verify your Sanity project ID is correct
3. Make sure the token has proper permissions

---

**Your admin dashboard will work perfectly once you add the Sanity token!** 🎉 