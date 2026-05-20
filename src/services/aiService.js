import axios from 'axios';
import * as FileSystem from 'expo-file-system';

// Backend API URL - you'll need to deploy this
const BACKEND_URL = 'https://voice-journal-ten.vercel.app';

/**
 * Analyze voice journal using AI
 * This sends audio to your backend, which then calls Groq API
 */
export const analyzeVoiceJournal = async (audioUri) => {
  try {
    // Read audio file as base64
    const audioBase64 = await FileSystem.readAsStringAsync(audioUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Send to backend for processing
    const response = await axios.post(`${BACKEND_URL}/api/analyze`, {
      audio: audioBase64,
      mimeType: 'audio/m4a', // Expo default format
    }, {
      timeout: 60000, // 60 second timeout
    });

    return {
      transcription: response.data.transcription,
      mood: response.data.mood,
      sentiment: response.data.sentiment,
      keywords: response.data.keywords,
    };
  } catch (error) {
    console.error('Error analyzing voice journal:', error);
    
    // Fallback for demo/testing without backend
    if (__DEV__) {
      console.warn('Using mock data for development');
      return getMockAnalysis();
    }
    
    throw new Error('Failed to analyze voice journal. Please check your connection.');
  }
};

/**
 * Mock analysis for development/testing
 */
const getMockAnalysis = () => {
  const moods = ['happy', 'calm', 'anxious', 'excited', 'neutral'];
  const randomMood = moods[Math.floor(Math.random() * moods.length)];
  
  return {
    transcription: 'This is a mock transcription for testing purposes. In production, this would be the actual transcription of your voice recording.',
    mood: randomMood,
    sentiment: Math.random() * 2 - 1, // Random between -1 and 1
    keywords: ['work', 'family', 'health', 'goals'],
  };
};
