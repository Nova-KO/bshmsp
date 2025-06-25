# BSH Technologies Website Deployment Guide

## Prerequisites

Before deploying, ensure you have:
- A GitHub account
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- A Formspree account (sign up at [formspree.io](https://formspree.io))

## Step 1: Complete Formspree Setup (5 minutes)

### 1.1 Create Formspree Account
1. Visit [https://formspree.io/](https://formspree.io/)
2. Click "Get started" 
3. Enter the email where you want to receive contact form submissions
4. Create your account and verify your email

### 1.2 Create Your Contact Form
1. After signing in, click "New Form"
2. Give your form a name: **"BSH Technologies Contact Form"**
3. Choose your plan:
   - **Free**: 50 submissions/month (perfect for testing)
   - **Gold**: 1000 submissions/month ($10/month)
   - **Platinum**: Unlimited submissions ($25/month)

### 1.3 Get Your Form ID
After creating the form, you'll see a form endpoint like:
```
https://formspree.io/f/xrgjyqpw
```
Copy the ID after `/f/` (in this example: `xrgjyqpw`)

### 1.4 Update Your Contact Form
1. Open `contact.html` in your code editor
2. Find line 90 with: `action="https://formspree.io/f/YOUR_FORM_ID"`
3. Replace `YOUR_FORM_ID` with your actual Form ID:
   ```html
   action="https://formspree.io/f/xrgjyqpw"
   ```

### 1.5 Configure Form Settings (Optional)
In your Formspree dashboard, you can:
- Set up auto-reply emails to customers
- Add file upload capabilities
- Configure spam protection
- Add integrations (Slack, email, etc.)

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and log in
3. Click "New Project"
4. Import your GitHub repository
5. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: Leave empty (static site)
   - **Output Directory**: Leave empty (static site)
6. Click "Deploy"

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from your project directory:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Link to existing project? **N**
   - Project name: **bsh-technologies** (or your preferred name)
   - Directory: **./** (current directory)
   - Want to override settings? **N**

## Step 3: Configure Custom Domain (Optional)

1. In your Vercel dashboard, go to your project
2. Click on "Domains" tab
3. Add your custom domain
4. Update your domain's DNS settings as instructed by Vercel

## Step 4: Test the Contact Form

1. Visit your deployed website
2. Go to the contact page
3. Fill out and submit the form
4. Check your email (associated with Formspree account) for the submission
5. You can also check submissions in your Formspree dashboard

## Environment Variables (If Needed)

If you need to set environment variables:

1. Go to your Vercel project dashboard
2. Click on "Settings" tab
3. Click on "Environment Variables"
4. Add any required variables

## Project Structure

```
/
├── index.html              # Homepage
├── contact.html           # Contact page with Formspree form
├── about.html            # About page
├── pricing.html          # Pricing page
├── blog.html            # Blog listing
├── vercel.json          # Vercel configuration
├── css/                 # Stylesheets
├── js/                  # JavaScript files
├── images/              # Image assets
├── blog/                # Blog posts
├── services/            # Service pages
├── use-cases/           # Use case pages
└── includes/            # Header/footer includes
```

## Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] All pages are accessible
- [ ] Contact form submits successfully
- [ ] Form submissions appear in Formspree dashboard
- [ ] All images and assets load properly
- [ ] Website is mobile-responsive
- [ ] Custom domain configured (if applicable)

## Troubleshooting

### Form Not Working
- Verify the Formspree form ID is correct in `contact.html`
- Check that the form action URL matches your Formspree endpoint
- Ensure the form method is set to "POST"

### Assets Not Loading
- Check that all file paths are relative and correct
- Verify the `vercel.json` configuration includes all necessary directories

### Deployment Errors
- Check the Vercel deployment logs in the dashboard
- Ensure all required files are committed to your repository
- Verify the project structure matches the expected layout

## Support

For deployment issues:
- [Vercel Documentation](https://vercel.com/docs)
- [Formspree Documentation](https://help.formspree.io/)

For website-specific issues, contact the development team. 