import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Initialize Gemini API (Will throw error if GEMINI_API_KEY is missing)
let genAI;
try {
  if (process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  } else {
    console.warn('⚠️ WARNING: GEMINI_API_KEY is not set in .env');
  }
} catch (e) {
  console.error('Failed to initialize Gemini API:', e);
}

// ─── Dummy Database Validation ──────────────────────────────────
// In a real app, you would check Firestore or PostgreSQL here.
// Since Firestore rules were blocking, we will mock the validation:
// We accept any key that starts with "sk_live_"
function validateApiKey(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer sk_live_')) {
    return res.status(401).json({
      error: { message: "Invalid API key provided. Key must start with 'sk_live_'" }
    });
  }
  
  // Attach key to request for logging if needed
  req.apiKey = authHeader.split(' ')[1];
  next();
}

// ─── Chat Completions Endpoint ──────────────────────────────────
app.post('/v1/chat/completions', validateApiKey, async (req, res) => {
  try {
    const { messages, model = 'gemini-2.5-flash' } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: { message: "messages array is required" } });
    }

    if (!genAI) {
      return res.status(500).json({ error: { message: "Gemini API is not configured on the server." } });
    }

    // Format messages for Gemini
    // We'll construct a simple prompt string from the message history for now
    let promptString = '';
    for (const msg of messages) {
      promptString += `${msg.role.toUpperCase()}: ${msg.content}\n`;
    }
    promptString += `ASSISTANT: `;

    console.log(`[LexForge Gateway] Processing request with key ${req.apiKey.substring(0, 12)}...`);

    const geminiModel = genAI.getGenerativeModel({ model });
    const result = await geminiModel.generateContent(promptString);
    const responseText = result.response.text();

    console.log(`[LexForge Gateway] Request successful. Sending response.`);

    // Return in standard OpenAI/LexForge API format
    res.json({
      id: "chatcmpl-" + Math.random().toString(36).substring(2, 10),
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model: model,
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: responseText
          },
          finish_reason: "stop"
        }
      ],
      usage: {
        prompt_tokens: 0, // In a real app, count tokens
        completion_tokens: 0,
        total_tokens: 0
      }
    });

  } catch (error) {
    console.error('[LexForge Gateway] Error:', error);
    res.status(500).json({
      error: { message: error.message || "An error occurred while processing your request." }
    });
  }
});

// Start Server (Only when not running in Vercel Serverless mode)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 LexForge API Gateway is running on http://localhost:${PORT}`);
    console.log(`Waiting for requests...`);
  });
}

// Export for Vercel
export default app;
