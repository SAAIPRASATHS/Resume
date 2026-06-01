import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for seamless developer testing
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Routes
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.RECIPIENT_EMAIL || 'saaiprasath.s2024aids@sece.ac.in',
      subject: `New Message from ${name} (Portfolio)`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; color: #1f2937; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
          <h2 style="color: #2563eb; border-bottom: 2px solid #f3f4f6; padding-bottom: 15px; margin-top: 0; font-size: 20px; font-weight: 700;">📬 New Portfolio Inquiry</h2>
          <div style="margin: 20px 0;">
            <p style="font-size: 15px; margin: 8px 0; color: #4b5563;"><strong>Sender Name:</strong> <span style="color: #1f2937; font-weight: 500;">${name}</span></p>
            <p style="font-size: 15px; margin: 8px 0; color: #4b5563;"><strong>Email Address:</strong> <a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${email}</a></p>
          </div>
          <p style="font-size: 15px; margin-bottom: 10px; color: #4b5563; font-weight: 600;">Message Content:</p>
          <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; border-left: 4px solid #2563eb; white-space: pre-wrap; font-size: 14.5px; line-height: 1.6; color: #111827; font-family: inherit;">${message}</div>
          <footer style="margin-top: 30px; font-size: 12px; color: #9ca3af; text-align: center; border-top: 1px solid #f3f4f6; padding-top: 15px;">
            Sent automatically from Saaiprasath S Portfolio Contact Form
          </footer>
        </div>
      `
    });

    console.log('Email sent successfully:', data);
    res.status(200).json({ success: true, message: 'Email sent successfully!', id: data.id });
  } catch (error) {
    console.error('Resend Error:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to send email.' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
