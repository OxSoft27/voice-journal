import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { analyzeVoiceJournal } from '../services/aiService';

export default function RecordScreen({ navigation }) {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = async () => {
    try {
      // Request permissions
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission Required', 'Please allow microphone access to record your journal.');
        return;
      }

      // Configure audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // Start recording
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      setRecording(recording);
      setIsRecording(true);
      setRecordingDuration(0);
    } catch (error) {
      console.error('Failed to start recording:', error);
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      
      setIsProcessing(true);
      
      // Process the recording
      await processRecording(uri);
      
      setRecording(null);
      setRecordingDuration(0);
      setIsProcessing(false);
      
      Alert.alert(
        'Success!',
        'Your journal entry has been saved and analyzed.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Failed to stop recording:', error);
      setIsProcessing(false);
      Alert.alert('Error', 'Failed to process recording. Please try again.');
    }
  };

  const processRecording = async (audioUri) => {
    try {
      // Call AI service to transcribe and analyze
      const result = await analyzeVoiceJournal(audioUri);
      
      // Save to storage
      const entry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        audioUri,
        transcription: result.transcription,
        mood: result.mood,
        sentiment: result.sentiment,
        keywords: result.keywords,
        duration: recordingDuration
      };

      // Get existing entries
      const existingEntries = await AsyncStorage.getItem('journal_entries');
      const entries = existingEntries ? JSON.parse(existingEntries) : [];
      
      // Add new entry
      entries.push(entry);
      
      // Save back
      await AsyncStorage.setItem('journal_entries', JSON.stringify(entries));
    } catch (error) {
      console.error('Error processing recording:', error);
      throw error;
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.visualizer}>
          {isRecording ? (
            <>
              <View style={styles.pulseOuter} />
              <View style={styles.pulseMiddle} />
              <View style={styles.pulseInner} />
              <Text style={styles.micIcon}>🎙️</Text>
            </>
          ) : (
            <Text style={styles.micIconInactive}>🎙️</Text>
          )}
        </View>

        <Text style={styles.duration}>{formatDuration(recordingDuration)}</Text>
        
        {isRecording ? (
          <Text style={styles.status}>Recording...</Text>
        ) : isProcessing ? (
          <Text style={styles.status}>Processing...</Text>
        ) : (
          <Text style={styles.status}>Ready to record</Text>
        )}

        {isProcessing && <ActivityIndicator size="large" color="#6366f1" style={styles.loader} />}

        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            {isRecording 
              ? 'Speak naturally about your day, feelings, or thoughts'
              : 'Tap the button below to start recording your journal entry'
            }
          </Text>
        </View>
      </View>

      <View style={styles.controls}>
        {!isRecording && !isProcessing && (
          <TouchableOpacity 
            style={styles.recordButton}
            onPress={startRecording}
          >
            <Text style={styles.recordButtonText}>Start Recording</Text>
          </TouchableOpacity>
        )}

        {isRecording && (
          <TouchableOpacity 
            style={styles.stopButton}
            onPress={stopRecording}
          >
            <Text style={styles.stopButtonText}>Stop & Save</Text>
          </TouchableOpacity>
        )}

        {!isRecording && !isProcessing && (
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  visualizer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  pulseOuter: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  pulseMiddle: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
  },
  pulseInner: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(99, 102, 241, 0.3)',
  },
  micIcon: {
    fontSize: 60,
  },
  micIconInactive: {
    fontSize: 80,
    opacity: 0.5,
  },
  duration: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  status: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
  instructions: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
    maxWidth: '90%',
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  controls: {
    padding: 20,
  },
  recordButton: {
    backgroundColor: '#6366f1',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  recordButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stopButton: {
    backgroundColor: '#ef4444',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  stopButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});
