// Vercel Serverless Function for Internship Application
// File: api/internship.js

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Only POST requests are accepted.'
    });
  }

  const webhookUrl = 'https://script.google.com/macros/s/AKfycbw2ClUZDC3P17ihi0lI0Ja5fdHl2yGECf_D3nTLlrBd8dHjlRkDuggPhaw1XqLH96lM/exec';

  const {
    name,
    email,
    phone,
    university,
    year,
    role,
    why,
    github,
    experience,
    resume
  } = req.body;

  // Basic validation
  if (!name || !email || !phone || !university || !year || !role || !why || !github || !resume) {
    return res.status(400).json({
      success: false,
      message: 'Please fill in all required fields.'
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

  // POST to Google Apps Script webhook
  try {
    const webhookRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        phone,
        university,
        year,
        role,
        why,
        github,
        experience,
        resume
      })
    });
    const webhookData = await webhookRes.json();
    if (webhookRes.ok && webhookData.success) {
      return res.status(200).json({
        success: true,
        message: webhookData.message || 'Application submitted successfully!'
      });
    } else {
      return res.status(500).json({
        success: false,
        message: webhookData.message || 'Failed to submit application. Please try again.'
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
} 