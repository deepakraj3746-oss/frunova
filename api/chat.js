export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if(req.method === 'OPTIONS') return res.status(200).end();
  
  const { message, products } = req.body;
  
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [
        { role: 'system', content: 'You are Faunova fruit shop assistant. Be short and friendly. Answer in same language as user. Products: ' + products },
        { role: 'user', content: message }
      ],
      max_tokens: 150
    })
  });
  
  const data = await response.json();
  res.status(200).json({ reply: data.choices[0].message.content });
}
