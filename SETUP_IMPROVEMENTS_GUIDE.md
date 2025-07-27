# BSH Technologies - Setup Improvements Guide

This guide covers the recent improvements made to the BSH Technologies website, including Sanity Studio setup, HTTPS redirects, accessibility improvements, and environment variable configuration.

## 🎯 Overview of Improvements

1. **Fixed Sanity Studio Setup** - Proper configuration and environment setup
2. **Added HTTPS Redirects** - Enhanced security with proper redirects and headers
3. **Improved Accessibility** - WCAG compliant navigation and UI elements
4. **Environment Variable Configuration** - Centralized configuration management

---

## 1. 🔧 Sanity Studio Setup

### Fixed Issues:
- ✅ Proper configuration file structure
- ✅ Environment variable integration
- ✅ CORS configuration for development
- ✅ Port configuration (3333)

### Setup Instructions:

#### 1.1 Install Dependencies
```bash
cd sanity-cms
npm install
```

#### 1.2 Configure Environment Variables
Copy the example environment file:
```bash
cp env.example .env
```

Edit `.env` and add your Sanity API token:
```env
SANITY_STUDIO_PROJECT_ID=w38otuoh
SANITY_STUDIO_DATASET=production
SANITY_API_TOKEN=your_actual_token_here
```

#### 1.3 Start Sanity Studio
```bash
npm run dev
```

Sanity Studio will be available at: `http://localhost:3333`

#### 1.4 Deploy Sanity Studio (Optional)
```bash
npm run deploy
```

---

## 2. 🔒 HTTPS Redirects & Security

### Added Security Headers:
- ✅ **Strict-Transport-Security** - Enforces HTTPS
- ✅ **Referrer-Policy** - Controls referrer information
- ✅ **Permissions-Policy** - Restricts browser features
- ✅ **X-Content-Type-Options** - Prevents MIME type sniffing
- ✅ **X-Frame-Options** - Prevents clickjacking
- ✅ **X-XSS-Protection** - XSS protection

### Configuration:
The security headers are configured in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
}
```

---

## 3. ♿ Accessibility Improvements

### WCAG 2.1 AA Compliance Features:

#### 3.1 Navigation Accessibility
- ✅ **Semantic HTML** - Proper `<header>`, `<nav>`, `<button>` elements
- ✅ **ARIA Labels** - Descriptive labels for screen readers
- ✅ **ARIA States** - `aria-expanded`, `aria-controls`, `aria-hidden`
- ✅ **Keyboard Navigation** - Full keyboard support
- ✅ **Focus Management** - Proper focus indicators

#### 3.2 Interactive Elements
- ✅ **Button Elements** - Services dropdown uses `<button>` instead of `<a>`
- ✅ **Role Attributes** - `role="menu"`, `role="menuitem"`, `role="dialog"`
- ✅ **Alt Text** - Descriptive alt text for all images
- ✅ **Skip Links** - Keyboard users can skip to main content

#### 3.3 Mobile Accessibility
- ✅ **Touch Targets** - Minimum 44px touch targets
- ✅ **Screen Reader Support** - Proper labeling for mobile menu
- ✅ **Gesture Alternatives** - Keyboard alternatives for touch gestures

### Accessibility Features Added:

#### Header Navigation:
```html
<header class="navbar" role="banner">
  <nav role="navigation" aria-label="Main navigation">
    <button aria-expanded="false" aria-haspopup="true" aria-label="Services menu">
      Services
    </button>
  </nav>
</header>
```

#### Mobile Menu:
```html
<div role="dialog" aria-label="Mobile navigation menu" aria-hidden="true">
  <button aria-expanded="false" aria-controls="mobileNavOverlay">
    <span aria-hidden="true"></span>
  </button>
</div>
```

#### JavaScript Enhancements:
- ✅ **ARIA State Management** - Dynamic updates of `aria-expanded`
- ✅ **Keyboard Support** - Escape key closes dropdowns
- ✅ **Focus Trapping** - Focus stays within modal dialogs

---

## 4. ⚙️ Environment Variable Configuration

### 4.1 Configuration Structure

The environment configuration is centralized in `js/env-config.js`:

```javascript
const envConfig = new EnvironmentConfig();

// Access configuration
const sanityConfig = envConfig.getSanity();
const websiteConfig = envConfig.getWebsite();
const analyticsConfig = envConfig.getAnalytics();
```

### 4.2 Environment Variables

#### Required Variables:
```env
# Sanity CMS
SANITY_STUDIO_PROJECT_ID=w38otuoh
SANITY_STUDIO_DATASET=production
SANITY_API_TOKEN=your_token_here

# Website
BASE_URL=https://bshtechnologies.in
NODE_ENV=production

# Security
SESSION_SECRET=your_session_secret
ADMIN_PASSWORD_HASH=your_bcrypt_hash
```

#### Optional Variables:
```env
# Analytics
GOOGLE_ANALYTICS_ID=GTM-XXXXXXX
FACEBOOK_PIXEL_ID=your_pixel_id

# Email
FORMSPREE_ID=your_formspree_id
RESEND_API_KEY=your_resend_key

# Performance
CACHE_DURATION=3600
CDN_URL=https://cdn.bshtechnologies.in
```

### 4.3 Usage Examples

#### In JavaScript Files:
```javascript
// Get Sanity configuration
const sanityConfig = envConfig.getSanity();
const client = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  useCdn: sanityConfig.useCdn
});

// Check feature flags
if (envConfig.isFeatureEnabled('errorTracking')) {
  // Initialize error tracking
}

// Get analytics configuration
const analytics = envConfig.getAnalytics();
if (analytics.enabled && analytics.googleAnalyticsId) {
  // Initialize Google Analytics
}
```

#### In HTML Templates:
```html
<script>
  // Make environment variables available to frontend
  window.ENV = {
    SANITY_STUDIO_PROJECT_ID: 'w38otuoh',
    BASE_URL: 'https://bshtechnologies.in',
    ENABLE_ANALYTICS: 'true'
  };
</script>
```

---

## 5. 🚀 Deployment Instructions

### 5.1 Environment Setup

1. **Create Environment File:**
   ```bash
   cp env.example .env
   ```

2. **Configure Variables:**
   - Add your Sanity API token
   - Set production URLs
   - Configure analytics IDs
   - Set security secrets

3. **Validate Configuration:**
   ```javascript
   // This will run automatically in development
   envConfig.validate();
   ```

### 5.2 Vercel Deployment

1. **Set Environment Variables in Vercel:**
   - Go to your Vercel project dashboard
   - Navigate to Settings > Environment Variables
   - Add all required variables from `env.example`

2. **Deploy:**
   ```bash
   git add .
   git commit -m "Add accessibility improvements and environment configuration"
   git push origin main
   vercel --prod
   ```

### 5.3 Sanity Studio Deployment

1. **Deploy Sanity Studio:**
   ```bash
   cd sanity-cms
   npm run deploy
   ```

2. **Configure CORS:**
   - Go to Sanity project settings
   - Add your production domain to CORS origins

---

## 6. 🧪 Testing Checklist

### 6.1 Accessibility Testing

- [ ] **Keyboard Navigation** - All interactive elements accessible via keyboard
- [ ] **Screen Reader** - Test with NVDA, JAWS, or VoiceOver
- [ ] **Color Contrast** - Ensure sufficient contrast ratios
- [ ] **Focus Indicators** - Visible focus indicators on all interactive elements
- [ ] **ARIA States** - Proper state management for dropdowns and modals

### 6.2 Security Testing

- [ ] **HTTPS Redirects** - Verify all HTTP requests redirect to HTTPS
- [ ] **Security Headers** - Check headers are properly set
- [ ] **CORS Configuration** - Verify Sanity API calls work
- [ ] **Session Management** - Test admin authentication

### 6.3 Functionality Testing

- [ ] **Sanity Studio** - Content management works correctly
- [ ] **Navigation** - All links and dropdowns function properly
- [ ] **Forms** - Contact forms submit successfully
- [ ] **Analytics** - Tracking events fire correctly
- [ ] **Error Handling** - Errors are caught and logged

---

## 7. 📊 Monitoring & Maintenance

### 7.1 Performance Monitoring

- Monitor Core Web Vitals
- Track page load times
- Monitor API response times
- Check error rates

### 7.2 Accessibility Monitoring

- Regular accessibility audits
- Screen reader testing
- Keyboard navigation testing
- Color contrast validation

### 7.3 Security Monitoring

- Regular security audits
- Monitor for security headers
- Check for HTTPS compliance
- Review access logs

---

## 8. 🔧 Troubleshooting

### Common Issues:

#### Sanity Studio Not Loading
```bash
# Check if dependencies are installed
cd sanity-cms
npm install

# Check environment variables
cat .env

# Try different port
npm run dev -- --port 3334
```

#### Accessibility Issues
- Check browser console for ARIA warnings
- Verify all interactive elements have proper labels
- Test with keyboard navigation only
- Use accessibility testing tools

#### Environment Variables Not Working
```javascript
// Check if variables are loaded
console.log(envConfig.export());

// Validate configuration
envConfig.validate();
```

---

## 9. 📚 Additional Resources

### Documentation:
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

### Tools:
- [axe DevTools](https://www.deque.com/axe/browser-extensions/) - Accessibility testing
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance and accessibility
- [WAVE](https://wave.webaim.org/) - Web accessibility evaluation

---

## ✅ Summary

All improvements have been successfully implemented:

1. **Sanity Studio** - Properly configured and ready for content management
2. **HTTPS Security** - Enhanced security with proper headers and redirects
3. **Accessibility** - WCAG 2.1 AA compliant navigation and UI
4. **Environment Configuration** - Centralized and flexible configuration system

The website is now more secure, accessible, and maintainable! 🎉 