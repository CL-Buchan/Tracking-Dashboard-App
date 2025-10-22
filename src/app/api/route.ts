// src/app/api/chat/route.js
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: any) {
  try {
    const { messages } = await req.json();

    const completion = await groq.chat.completions.create({
      messages,
      model: "openai/gpt-oss-20b",
    });

    return Response.json({
      text: completion.choices[0]?.message?.content || '',
    });
  } catch (err) {
    console.error('API error:', err);
    return Response.json({ error: 'Failed to get response' }, { status: 500 });
  }
}