import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { company, name, email, siteUrl, message } = req.body;

    // Validate required fields
    if (!company || !name || !email || !siteUrl || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const emailHtml = `
      <h2>New Quote Request</h2>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Website:</strong> <a href="${siteUrl}">${siteUrl}</a></p>
      <p><strong>Problem Description:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><em>Submitted via precisionfrontend.com</em></p>
    `;

    const emailText = `
New Quote Request

Company: ${company}
Name: ${name}
Email: ${email}
Website: ${siteUrl}

Problem Description:
${message}

---
Submitted via precisionfrontend.com
    `.trim();

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Precision Frontend <noreply@precisionfrontend.com>',
      to: ['kyle.langford@gmail.com'],
      replyTo: email,
      subject: `[Quote Request] ${company}`,
      html: emailHtml,
      text: emailText,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
