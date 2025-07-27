# 🚀 Sanity Integration Setup for BSH Technologies

## Step 1: Create Sanity Account & Project

1. **Go to [sanity.io](https://sanity.io)** and sign up/login
2. **Create a new project**:
   - Project name: "BSH Technologies CMS"
   - Dataset: "production"
   - Template: "Clean project"
3. **Get your credentials**:
   - Project ID (found in project settings)
   - Dataset: "production"
   - API Token (create in API settings)

## Step 2: Update Configuration

Once you have your Sanity project:

1. **Update `sanity-cms/sanity.config.js`** with your project ID
2. **Update the client configuration** in the frontend files
3. **Install dependencies** in sanity-cms folder
4. **Deploy Sanity Studio**

## Step 3: Test Integration

1. **Run Sanity Studio locally**: `npm run dev` in sanity-cms folder
2. **Create test job posting** in the admin panel
3. **Verify it appears** on your career page

## Next Steps

After completing the Sanity setup:
- Run the Sanity Studio locally to test
- Deploy the Studio to Sanity's hosting
- Your website will automatically fetch jobs from Sanity

## Files Created

- `sanity-cms/` - Sanity Studio configuration
- `js/sanity-client.js` - Frontend client for fetching jobs
- Updated `career.html` - Dynamic job loading

## Support

If you need help with the Sanity account setup, I can guide you through each step! 