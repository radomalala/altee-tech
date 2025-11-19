// Inquiry endpoint (Formation/Service interest) - sends to dafnofy@gmail.com
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  const { name, email, phone, title, category, description, request, hp } = req.body || {};
  // Honeypot
  if (hp && String(hp).trim() !== '') {
    res.status(200).json({ success: true, emailed: false, reason: 'spam' });
    return;
  }
  if (!name || !email || !phone || !request) {
    res.status(400).json({ success: false, error: 'Champs requis manquants' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    res.status(200).json({ success: true, emailed: false, reason: 'RESEND_API_KEY missing' });
    return;
  }

  const to = 'dafnofy@gmail.com';
  const from = process.env.RESEND_FROM || 'onboarding@resend.dev';
  const subject = `${category} - ${title}`;
  const html = `
    <div style="font-family:Inter,system-ui,Arial,sans-serif;line-height:1.6;color:#0f172a">
      <h2 style="margin:0 0 8px 0">Nouvelle demande : ${category}</h2>
      <h3 style="margin:0 0 12px 0;color:#334155">${title}</h3>
      <p style="margin:0 0 12px 0;color:#64748b">${description}</p>
      <hr style="border:0;border-top:1px solid #e2e8f0;margin:16px 0"/>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px 0;width:120px;color:#64748b">Nom</td><td>${name}</td></tr>
        <tr><td style="padding:8px 0;color:#64748b">Email</td><td>${email}</td></tr>
        <tr><td style="padding:8px 0;color:#64748b">Téléphone</td><td>${phone}</td></tr>
        <tr><td style="padding:8px 0;color:#64748b">Demande</td><td>${(request || '').replace(/\n/g,'<br/>')}</td></tr>
      </table>
    </div>
  `;

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, subject, html })
    });
    if (!resp.ok) {
      const text = await resp.text();
      console.warn('Resend error:', resp.status, text);
      res.status(200).json({ success: true, emailed: false, reason: 'API error' });
      return;
    }
    res.status(200).json({ success: true, emailed: true });
  } catch (err) {
    console.warn('Email send failed:', err.message);
    res.status(200).json({ success: true, emailed: false, reason: 'network' });
  }
}
