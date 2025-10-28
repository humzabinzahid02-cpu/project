import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { command } = await req.json();
  
  const res = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: command,
      max_tokens: 150
    })
  });

  const data = await res.json();
  return NextResponse.json({ responseText: data.choices?.[0]?.text?.trim() || '' });
}