# Header and Footer Include System

This directory contains external header and footer files that can be included across all pages of the BSH Technologies website.

## Available Files

### JavaScript-based Includes
- `header.html` - Contains the navigation bar HTML
- `footer.html` - Contains the footer HTML
- `../js/includes.js` - JavaScript utility to load the includes

### PHP-based Includes (Alternative)
- `header.php` - Contains the navigation bar HTML
- `footer.php` - Contains the footer HTML

## Usage

### Method 1: JavaScript Includes (Client-side)

1. **Add include placeholders in your HTML:**
```html
<div data-include="header"></div>
<!-- Your page content -->
<div data-include="footer"></div>
```

2. **Add the includes script before other scripts:**
```html
<script src="js/includes.js" type="text/javascript"></script>
```

### Method 2: PHP Includes (Server-side)

1. **Rename your HTML files to `.php` extension**

2. **Use PHP include statements:**
```php
<?php include 'includes/header.php'; ?>
<!-- Your page content -->
<?php include 'includes/footer.php'; ?>
```

## Benefits

1. **Maintainability**: Update header/footer in one place, changes apply to all pages
2. **Consistency**: Ensures all pages use the same navigation and footer structure
3. **Development Speed**: No need to copy/paste header and footer code to new pages
4. **Easy Updates**: Logo, navigation links, or footer information changes require only one file edit

## Files Using This System

- `index.html` - Homepage
- `pricing.html` - Pricing page
- (Add more pages as they're converted)

## Notes

- The JavaScript method requires the files to be served from a web server (not file:// protocol)
- The PHP method requires a server with PHP support
- Image paths in includes are relative to the page that includes them
- All navigation functionality and styling remains intact 