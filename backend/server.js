import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const port = Number(process.env.PORT || 3000);
const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body ?? {};
  if (![name, email, message].every((value) => typeof value === 'string' && value.trim())) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }
  if (name.length > 120 || email.length > 254 || message.length > 5000) {
    return res.status(413).json({ error: 'One or more fields are too long.' });
  }
  // Connect this endpoint to an email provider or database before using it in production.
  console.info(`Contact form received from ${email.trim()}`);
  return res.status(202).json({ message: 'Thanks for reaching out. Your message is ready to be delivered.' });
});

app.listen(port, () => console.log(`Portfolio API listening on http://localhost:${port}`));
