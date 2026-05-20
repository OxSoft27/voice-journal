// Vercel Serverless Function for Voice Journal Analysis
// Uses Groq API (FREE) for Speech-to-Text and Sentiment Analysis

const GROQ_API_KEY = process.env.GROQ_API_KEY; // Set this in Vercel environment variables

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { audio, mimeType } = req.body;

    if (!audio) {
      return res.status(400).json({ error: 'Audio data is required' });
    }

    // Step 1: Transcribe audio using Groq Whisper
    const transcription = await transcribeAudio(audio, mimeType);

    // Step 2: Analyze sentiment and extract mood using Groq Llama
    const analysis = await analyzeSentiment(transcription);

    return res.status(200).json({
      transcription,
      mood: analysis.mood,
      sentiment: analysis.sentiment,
      keywords: analysis.keywords,
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ 
      error: 'Failed to process audio',
      message: error.message 
    });
  }
}

/**
 * Transcribe audio using Groq Whisper API
 */
async function transcribeAudio(audioBase64, mimeType) {
  try {
    // Convert base64 to buffer
    const audioBuffer = Buffer.from(audioBase64, 'base64');

    // Create form data
    const FormData = require('form-data');
    const form = new FormData();
    form.append('file', audioBuffer, {
      filename: 'audio.m4a',
      contentType: mimeType || 'audio/m4a',
    });
    form.append('model', 'whisper-large-v3');
    form.append('language', 'en'); // Change to 'id' for Indonesian

    // Call Groq Whisper API
    const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        ...form.getHeaders(),
      },
      body: form,
    });

    if (!response.ok) {
      throw new Error(`Groq Whisper API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Transcription error:', error);
    throw new Error('Failed to transcribe audio');
  }
}

/**
 * Analyze sentiment using Groq Llama 3.1
 */
async function analyzeSentiment(text) {
  try {
    const prompt = `Analyze the following journal entry and provide:
1. Overall mood (choose one: happy, sad, anxious, calm, excited, angry, neutral)
2. Sentiment score (-1 to 1, where -1 is very negative, 0 is neutral, 1 is very positive)
3. Key topics/keywords (max 5)

Journal entry: "${text}"

Respond in JSON format:
{
  "mood": "...",
  "sentiment": 0.0,
  "keywords": ["...", "..."]
}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are a mental health assistant that analyzes journal entries. Always respond with valid JSON only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse JSON response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from AI');
    }
    
    const analysis = JSON.parse(jsonMatch[0]);
    
    return {
      mood: analysis.mood || 'neutral',
      sentiment: analysis.sentiment || 0,
      keywords: analysis.keywords || [],
    };
  } catch (error) {
    console.error('Sentiment analysis error:', error);
    
    // Fallback to basic analysis
    return {
      mood: 'neutral',
      sentiment: 0,
      keywords: extractBasicKeywords(text),
    };
  }
}

/**
 * Basic keyword extraction fallback
 */
function extractBasicKeywords(text) {
  const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'my', 'your', 'his', 'her', 'its', 'our', 'their', 'this', 'that', 'these', 'those']);
  
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.has(word));
  
  // Count word frequency
  const frequency = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  // Get top 5 most frequent words
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);
}
