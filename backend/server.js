const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/api/recommendations', async (req, res) => {
  try {
    const { currentProduct, allProducts } = req.body;
    console.log(' Recommendations requested for:', currentProduct.name);

    const productList = allProducts
      .filter(p => p.id !== currentProduct.id)
      .map(p => `${p.id}: ${p.name} (${p.category}, ₹${p.price})`)
      .join('\n');

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are an e-commerce recommendation engine. Always respond with valid JSON only, no extra text.'
        },
        {
          role: 'user',
          content: `Customer is viewing: "${currentProduct.name}" (${currentProduct.category}, ₹${currentProduct.price})
          
Available products:
${productList}

Return exactly this JSON format:
{
  "ids": [id1, id2, id3],
  "reason": "one short sentence why these complement the current product"
}`
        }
      ],
      max_tokens: 200,
      temperature: 0.3,
    });

    const text = response.choices[0]?.message?.content || '';
    console.log(' AI response:', text);

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');

    const parsed = JSON.parse(jsonMatch[0]);
    res.json({ success: true, ...parsed });

  } catch (error) {
    console.error(' Recommendations error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful eco-friendly shopping assistant. Keep responses short and friendly.'
        },
        { role: 'user', content: message }
      ],
      max_tokens: 300,
    });

    const reply = response.choices[0]?.message?.content || '';
    res.json({ success: true, reply });

  } catch (error) {
    console.error(' Chat error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/', (req, res) => {
  res.json({ status: ' EcoMart backend running!' });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(` EcoMart backend running on http://localhost:${PORT}`);
});