require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/chat', async (req, res) => {
  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: 'GROQ_API_KEY is not set on the server. Add it to your .env file.' });
  }

  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Request must include a non-empty "messages" array.' });
  }

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.6,
        max_tokens: 400
      })
    });

    const data = await groqRes.json();

    if (!groqRes.ok) {
      console.error('Groq API error:', data);
      return res.status(groqRes.status).json({
        error: data?.error?.message || 'Groq API returned an error.'
      });
    }

    const reply = data?.choices?.[0]?.message?.content || '';
    res.json({ reply });

  } catch (err) {
    console.error('Server error contacting Groq:', err);
    res.status(500).json({ error: 'Server error contacting Groq.' });
  }
});

app.listen(PORT, () => {
  console.log(`Scout backend running → http://localhost:${PORT}`);
});

module.exports = app;
