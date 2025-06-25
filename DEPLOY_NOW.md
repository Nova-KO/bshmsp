# 🚀 Deploy Your Project to Vercel NOW

## Step 1: Check Node.js Installation

Open Terminal/Command Prompt and run:
```bash
node --version
npm --version
```

**If not installed**: Download from [nodejs.org](https://nodejs.org/)

## Step 2: Install Vercel CLI

```bash
npm install -g vercel
```

## Step 3: Commit and Push Changes

```bash
git add .
git commit -m "Deploy serverless contact form to Vercel"
git push origin main
```

## Step 4: Deploy to Vercel

```bash
vercel --prod
```

**Follow the prompts:**
- Log in to Vercel when prompted
- Choose your account/scope
- Project name: `bsh-technologies-website`
- Directory: `./` (current directory)
- Link to existing project: `N` (No)

## Step 5: Add Environment Variable

1. **Go to**: [vercel.com](https://vercel.com) → Your Project → Settings → Environment Variables
2. **Add new variable**:
   - **Name**: `RESEND_API_KEY`
   - **Value**: (Get from [resend.com/api-keys](https://resend.com/api-keys))
   - **Environment**: All (Production, Preview, Development)
3. **Save** and **Redeploy**

## Step 6: Get Resend API Key

1. **Sign up**: [resend.com](https://resend.com)
2. **Go to**: API Keys section
3. **Create API Key**: "BSH Technologies Contact Form"
4. **Copy the key** (starts with `re_`)

## Step 7: Test Your Contact Form

1. **Visit**: `https://your-project.vercel.app/test-contact-form.html`
2. **Fill out** the test form
3. **Submit** and check for success message
4. **Check your email** (including spam folder)

## 🎯 Your Project URL

After deployment, Vercel will give you a URL like:
- `https://bsh-technologies-website.vercel.app`
- `https://your-project-name.vercel.app`

## 🔧 Update Email Address

**Edit `api/contact.js` line 86**:
```javascript
to: ['your-actual-email@domain.com'], // Replace with your real email
```

Then redeploy:
```bash
git add .
git commit -m "Update contact email"
git push origin main
```

## ✅ Success Checklist

- [ ] Node.js and npm installed
- [ ] Vercel CLI installed
- [ ] Project pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Environment variable `RESEND_API_KEY` added
- [ ] Contact form tested
- [ ] Email received

## 🚨 Troubleshooting

**Deployment fails?**
- Ensure you're logged in: `vercel login`
- Check git status: `git status`
- Verify files are committed

**No emails received?**
- Check spam/junk folder
- Verify API key is correct
- Check Resend dashboard for logs

**Form not working?**
- Check browser console for errors
- Verify environment variable is set
- Test with `test-contact-form.html`

## 🎉 You're Done!

Your professional contact form is now live with:
- ✅ Serverless architecture
- ✅ Professional email notifications
- ✅ Secure form handling
- ✅ Beautiful UI animations

**Next**: Update your marketing materials with your new contact page URL! 