// Root health check for Vercel serverless
export default function handler(req, res) {
  res.status(200).json({ ok: true, service: 'Altee Tech API (serverless)', timestamp: Date.now() });
}
