# Scout — Backend Setup

This runs the Scout demo (`public/index.html`) with a small server that keeps
your Groq API key private. The key is never sent to the browser.

## 1. Install dependencies
```
npm install
```

## 2. Add your API key
Copy `.env.example` to `.env`, then open `.env` and paste your real Groq key:
```
cp .env.example .env
```
```
GROQ_API_KEY=gsk_your_real_key_here
```
Get a free key at: https://console.groq.com/keys

## 3. Run the server
```
npm start
```

## 4. Open the demo
Visit **http://localhost:3000** in your browser. The chat is powered live by
Groq's `llama-3.3-70b-versatile` model through your own `/api/chat` route.

---

**Folder structure**
```
scout-backend/
├── .env              ← your real key goes here (create this — don't share it)
├── .env.example       ← template, safe to share
├── server.js          ← Express server + /api/chat route
├── package.json
└── public/
    └── index.html      ← Scout chat UI
```

**Notes**
- `.env` should never be committed to git or shared with anyone.
- To change the model, edit the `model` field in `server.js`.
- To deploy (e.g. Render, Railway, Vercel), just set `GROQ_API_KEY` as an
  environment variable in that platform's dashboard — same idea as `.env`.
