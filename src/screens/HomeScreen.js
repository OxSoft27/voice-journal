import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [stats, setStats] = useState({
    totalEntries: 0,
    currentStreak: 0,
    lastMood: null
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const entries = await AsyncStorage.getItem('journal_entries');
      if (entries) {
        const parsed = JSON.parse(entries);
        setStats({
          totalEntries: parsed.length,
          currentStreak: calculateStreak(parsed),
          lastMood: parsed[parsed.length - 1]?.mood || null
        });
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const calculateStreak = (entries) => {
    // Simple streak calculation - count consecutive days
    let streak = 0;
    const today = new Date().toDateString();
    
    for (let i = entries.length - 1; i >= 0; i--) {
      const entryDate = new Date(entries[i].timestamp).toDateString();
      if (entryDate === today || streak > 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const getMoodEmoji = (mood) => {
    const moodMap = {
      happy: '😊',
      sad: '😢',
      anxious: '😰',
      calm: '😌',
      excited: '🤩',
      angry: '😠',
      neutral: '😐'
    };
    return moodMap[mood] || '😐';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Voice Journal</Text>
        <Text style={styles.subtitle}>Track your mental wellness through voice</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.totalEntries}</Text>
          <Text style={styles.statLabel}>Total Entries</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.currentStreak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {stats.lastMood ? getMoodEmoji(stats.lastMood) : '—'}
          </Text>
          <Text style={styles.statLabel}>Last Mood</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.recordButton}
        onPress={() => navigation.navigate('Record')}
      >
        <Text style={styles.recordButtonText}>🎙️ Record Journal</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.historyButton}
        onPress={() => navigation.navigate('History')}
      >
        <Text style={styles.historyButtonText}>📖 View History</Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>How it works:</Text>
        <Text style={styles.infoText}>1. Record your daily thoughts (1-5 minutes)</Text>
        <Text style={styles.infoText}>2. AI analyzes your mood and emotions</Text>
        <Text style={styles.infoText}>3. Track patterns and insights over time</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#6366f1',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  recordButton: {
    backgroundColor: '#6366f1',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  recordButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  historyButton: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  historyButtonText: {
    color: '#6366f1',
    fontSize: 18,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
});
