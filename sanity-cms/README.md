# BSH Technologies - Sanity CMS

This directory contains the Sanity Studio configuration for managing job opportunities on the BSH Technologies website.

## 🚀 Quick Setup

### 1. Create Sanity Account
1. Go to [sanity.io](https://sanity.io) and create an account
2. Create a new project:
   - Name: "BSH Technologies CMS"
   - Dataset: "production"
   - Template: "Clean project"

### 2. Install Dependencies
```bash
cd sanity-cms
npm install
```

### 3. Configure Project
1. Copy your Project ID from the Sanity dashboard
2. Update `sanity.config.js`:
   ```javascript
   projectId: 'YOUR_ACTUAL_PROJECT_ID', // Replace this
   ```
3. Update `../js/sanity-client-browser.js`:
   ```javascript
   projectId: 'YOUR_ACTUAL_PROJECT_ID', // Replace this
   ```

### 4. Run Sanity Studio
```bash
npm run dev
```

Visit http://localhost:3333 to access the admin panel.

## 📝 Managing Jobs

### Adding a New Job
1. Open Sanity Studio
2. Click "Job Opportunities" 
3. Click "Create new Job Opportunity"
4. Fill in all required fields:
   - **Title**: Job title (e.g., "Python Backend Developer")
   - **Slug**: Auto-generated URL slug
   - **Description**: Brief role description
   - **Requirements**: List of requirements
   - **Eligibility**: Who can apply
   - **Skills**: Required technical skills
   - **Location**: Work location
   - **Duration**: How long the position lasts
   - **Job Type**: Internship, Full-time, etc.
   - **Application URL**: Where to apply
   - **Published**: Toggle to show/hide on website
   - **Featured**: Highlight this position

### Publishing Jobs
- Toggle "Published" to make jobs appear on the website
- Use "Featured Position" to highlight important jobs
- Set "Expires At" for time-limited postings

## 🔧 Technical Details

### Schema Fields
- `title`: Job title (required)
- `slug`: URL-friendly identifier (auto-generated)
- `description`: Role description (required)
- `requirements`: Array of requirements
- `eligibility`: Who can apply
- `skills`: Array of required skills
- `location`: Work location
- `duration`: Position duration
- `jobType`: Type of position (dropdown)
- `applicationUrl`: Application link
- `isActive`: Published status
- `featured`: Featured flag
- `publishedAt`: Publish date
- `expiresAt`: Expiration date (optional)

### API Queries
The frontend automatically fetches:
- All active jobs (ordered by featured, then date)
- Only jobs that haven't expired
- Only published jobs

## 🚀 Deployment

### Deploy Sanity Studio
```bash
npm run deploy
```

This creates a hosted admin panel at `https://your-project.sanity.studio`

### Website Integration
The main website automatically:
- Fetches jobs from Sanity API
- Falls back to static content if Sanity unavailable
- Updates in real-time when you publish changes

## 🛠 Troubleshooting

### Jobs Not Appearing?
1. Check if jobs are marked as "Published"
2. Verify the Project ID is correct in both config files
3. Check browser console for API errors
4. Ensure jobs haven't expired

### Can't Access Studio?
1. Verify you're logged into the correct Sanity account
2. Check if you have permissions on the project
3. Try refreshing your browser

### API Errors?
1. Check the Project ID matches your Sanity project
2. Verify the dataset name is "production"
3. Check browser network tab for request details

## 📞 Support

If you need help:
1. Check the Sanity documentation: [sanity.io/docs](https://sanity.io/docs)
2. Review the setup instructions in `SANITY_SETUP_INSTRUCTIONS.md`
3. Contact your developer for technical assistance

## 🎯 Next Steps

Once setup is complete:
1. Create your first job posting
2. Test it appears on the website
3. Deploy the studio for team access
4. Train team members on the admin interface 