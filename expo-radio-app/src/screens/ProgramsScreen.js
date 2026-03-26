/**
 * Programs Screen - Grille des programmes
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RADIO_CONFIG } from '../constants/config';

// Icon mapping
const getIconName = (iconKey) => {
  const iconMap = {
    'book-outline': 'book-outline',
    'library-outline': 'library-outline',
    'people-outline': 'people-outline',
    'mic-outline': 'mic-outline',
    'heart-outline': 'heart-outline',
    'hand-left-outline': 'hand-left-outline',
    'chatbubbles-outline': 'chatbubbles-outline',
    'moon-outline': 'moon-outline',
    'star-outline': 'star-outline',
  };
  return iconMap[iconKey] || 'radio-outline';
};

// Program Card Component
const ProgramCard = ({ program }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.cardContent}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={getIconName(program.icon)}
            size={24}
            color="#10B981"
          />
        </View>
        <View style={styles.programInfo}>
          <Text style={styles.programTitle}>{program.title}</Text>
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={12} color="#10B981" />
            <Text style={styles.programTime}>{program.time}</Text>
          </View>
          <Text style={styles.programDescription}>{program.description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#374151" />
      </View>
    </TouchableOpacity>
  );
};

// Main Screen Component
const ProgramsScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Grille des Programmes</Text>
          <Text style={styles.subtitle}>
            Découvrez nos émissions quotidiennes
          </Text>
        </View>

        {/* Programs List */}
        <View style={styles.programsList}>
          {RADIO_CONFIG.PROGRAMS.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  programsList: {
    gap: 12,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  programInfo: {
    flex: 1,
    marginLeft: 14,
  },
  programTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  programTime: {
    fontSize: 13,
    color: '#10B981',
    fontWeight: '500',
    marginLeft: 4,
  },
  programDescription: {
    fontSize: 12,
    color: '#9CA3AF',
    lineHeight: 18,
  },
});

export default ProgramsScreen;
