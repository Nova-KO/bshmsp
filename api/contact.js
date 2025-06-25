// Vercel Serverless Function for Contact Form
// File: api/contact.js

export default async function handler(req, res) {
  // Set CORS headers for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed. Only POST requests are accepted.' 
    });
  }

  // Check if API key is configured
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY environment variable is not set');
    return res.status(500).json({ 
      success: false,
      message: 'Server configuration error. Please contact support.' 
    });
  }

  const { name, email, organization, message } = req.body;

  // Enhanced validation
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false,
      message: 'Name, email, and message are required fields.' 
    });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false,
      message: 'Please provide a valid email address.' 
    });
  }

  // Sanitize inputs to prevent XSS
  const sanitize = (str) => str.replace(/[<>]/g, '');
  const sanitizedName = sanitize(name.trim());
  const sanitizedEmail = email.trim().toLowerCase();
  const sanitizedOrganization = organization ? sanitize(organization.trim()) : '';
  const sanitizedMessage = sanitize(message.trim());

  // Length validation
  if (sanitizedName.length > 100 || sanitizedMessage.length > 5000) {
    return res.status(400).json({ 
      success: false,
      message: 'Input too long. Name must be under 100 characters, message under 5000 characters.' 
    });
  }

  try {
    // Prepare email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #555; }
          .value { margin-top: 5px; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
            <p>You've received a new message from your website contact form.</p>
          </div>
          
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${sanitizedName}</div>
          </div>
          
          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${sanitizedEmail}</div>
          </div>
          
          <div class="field">
            <div class="label">Organization:</div>
            <div class="value">${sanitizedOrganization || 'Not provided'}</div>
          </div>
          
          <div class="field">
            <div class="label">Message:</div>
            <div class="value">${sanitizedMessage.replace(/\n/g, '<br>')}</div>
          </div>
          
          <div class="footer">
            <p>Sent from BSH Technologies contact form</p>
            <p>Time: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email using Resend API
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'BSH Technologies <contact@resend.dev>', // Use resend.dev for testing, change to your domain later
        to: ['novakopro@gmail.com'], // Updated to your Gmail address
        subject: `New Contact: ${sanitizedName} - ${sanitizedOrganization || 'BSH Technologies'}`,
        html: emailHtml,
        // Also send plain text version
        text: `
New Contact Form Submission

Name: ${sanitizedName}
Email: ${sanitizedEmail}
Organization: ${sanitizedOrganization || 'Not provided'}

Message:
${sanitizedMessage}

---
Sent from BSH Technologies contact form
Time: ${new Date().toLocaleString()}
        `.trim(),
      }),
    });

    const emailData = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error('Resend API error:', emailData);
      throw new Error(`Resend API error: ${emailData.message || 'Unknown error'}`);
    }

    console.log('Email sent successfully:', emailData.id);
    
    return res.status(200).json({ 
      success: true,
      message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
      id: emailData.id 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    // Don't expose detailed error information to the client
    return res.status(500).json({ 
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again or email us directly.',
    });
  }
} 