import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const data = await AsyncStorage.getItem('journal_entries');
      if (data) {
        const parsed = JSON.parse(data);
        // Sort by newest first
        const sorted = parsed.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setEntries(sorted);
      }
    } catch (error) {
      console.error('Error loading entries:', error);
      Alert.alert('Error', 'Failed to load journal entries.');
    }
  };

  const deleteEntry = async (id) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this journal entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const filtered = entries.filter(entry => entry.id !== id);
              await AsyncStorage.setItem('journal_entries', JSON.stringify(filtered));
              setEntries(filtered);
              setSelectedEntry(null);
            } catch (error) {
              console.error('Error deleting entry:', error);
              Alert.alert('Error', 'Failed to delete entry.');
            }
          }
        }
      ]
    );
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

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderEntry = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.entryCard,
        selectedEntry?.id === item.id && styles.entryCardSelected
      ]}
      onPress={() => setSelectedEntry(selectedEntry?.id === item.id ? null : item)}
    >
      <View style={styles.entryHeader}>
        <View style={styles.entryHeaderLeft}>
          <Text style={styles.moodEmoji}>{getMoodEmoji(item.mood)}</Text>
          <View>
            <Text style={styles.entryDate}>{formatDate(item.timestamp)}</Text>
            <Text style={styles.entryTime}>{formatTime(item.timestamp)}</Text>
          </View>
        </View>
        <View style={styles.sentimentBadge}>
          <Text style={styles.sentimentText}>
            {item.sentiment > 0.5 ? 'Positive' : item.sentiment < -0.5 ? 'Negative' : 'Neutral'}
          </Text>
        </View>
      </View>

      {selectedEntry?.id === item.id && (
        <View style={styles.entryDetails}>
          <Text style={styles.transcriptionLabel}>Transcription:</Text>
          <Text style={styles.transcriptionText}>{item.transcription}</Text>
          
          {item.keywords && item.keywords.length > 0 && (
            <View style={styles.keywordsContainer}>
              <Text style={styles.keywordsLabel}>Keywords:</Text>
              <View style={styles.keywordsList}>
                {item.keywords.map((keyword, index) => (
                  <View key={index} style={styles.keywordTag}>
                    <Text style={styles.keywordText}>{keyword}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => deleteEntry(item.id)}
          >
            <Text style={styles.deleteButtonText}>🗑️ Delete Entry</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  if (entries.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>📝</Text>
        <Text style={styles.emptyTitle}>No Journal Entries Yet</Text>
        <Text style={styles.emptyText}>Start recording your first voice journal to see it here!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={entries}
        renderItem={renderEntry}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  entryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  entryCardSelected: {
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  entryHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  entryDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  entryTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  sentimentBadge: {
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  sentimentText: {
    fontSize: 12,
    color: '#6366f1',
    fontWeight: '600',
  },
  entryDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  transcriptionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  transcriptionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 16,
  },
  keywordsContainer: {
    marginBottom: 16,
  },
  keywordsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  keywordsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  keywordTag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  keywordText: {
    fontSize: 12,
    color: '#666',
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#ef4444',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
