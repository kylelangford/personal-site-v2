import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, company, message, type } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Create email content
    const subject = type === 'project' ? 'New Project Inquiry' : 'New Intro Call Request';
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2563eb;">${subject}</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          <p><strong>Inquiry Type:</strong> ${type === 'project' ? 'Project Inquiry' : 'Intro Call Request'}</p>
        </div>
        <h3>Message:</h3>
        <div style="background: #ffffff; padding: 20px; border-left: 4px solid #2563eb; margin: 10px 0;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px;">
          This message was sent from the contact form at precisionfrontend.com<br>
          Reply directly to this email to respond to ${name}.
        </p>
      </div>
    `;

    // Send email using Resend
    await resend.emails.send({
      from: 'contact@precisionfrontend.com',
      to: 'kyle.langford@gmail.com',
      subject: `${subject} from ${name}`,
      html: htmlContent,
      replyTo: email,
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      error: 'Failed to send message. Please try again.' 
    });
  }
}