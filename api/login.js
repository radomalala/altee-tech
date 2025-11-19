// Vercel Serverless Function: simple login prototype

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  const { password } = req.body || {};
  if (password === 'admin123') {
    res.status(200).json({ success: true, token: 'fake-jwt-token-123456' });
  } else {
    res.status(401).json({ success: false, message: 'Mot de passe incorrect' });
  }
}
