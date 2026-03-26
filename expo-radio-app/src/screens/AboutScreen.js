/**
 * About Screen - À propos de la radio
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RADIO_CONFIG } from '../constants/config';

// Contact Item Component
const ContactItem = ({ icon, label, value, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.contactIcon}>
        <Ionicons name={icon} size={20} color="#10B981" />
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactLabel}>{label}</Text>
        <Text style={styles.contactValue}>{value}</Text>
      </View>
      {onPress && <Ionicons name="chevron-forward" size={18} color="#374151" />}
    </TouchableOpacity>
  );
};

// Frequency Item Component
const FrequencyItem = ({ city, frequency }) => {
  return (
    <View style={styles.frequencyItem}>
      <Text style={styles.frequencyCity}>{city}</Text>
      <Text style={styles.frequencyValue}>{frequency}</Text>
    </View>
  );
};

// Main Screen Component
const AboutScreen = () => {
  const insets = useSafeAreaInsets();

  const handlePhone = () => {
    Linking.openURL(`tel:${RADIO_CONFIG.CONTACT.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${RADIO_CONFIG.CONTACT.email}`);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo Header */}
        <View style={styles.logoHeader}>
          <LinearGradient
            colors={['#10B981', '#059669', '#14B8A6']}
            style={styles.logoContainer}
          >
            <View style={styles.logoInner}>
              <Text style={styles.logoText}>IQRA</Text>
              <Text style={styles.logoSubtext}>TV</Text>
            </View>
          </LinearGradient>
          <Text style={styles.stationName}>{RADIO_CONFIG.RADIO_NAME}</Text>
          <Text style={styles.slogan}>{RADIO_CONFIG.SLOGAN}</Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.description}>{RADIO_CONFIG.DESCRIPTION}</Text>
        </View>

        {/* Frequencies */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="radio" size={20} color="#10B981" />
            <Text style={styles.sectionTitle}>Fréquences</Text>
          </View>
          <View style={styles.frequenciesList}>
            {RADIO_CONFIG.FREQUENCIES.map((freq, index) => (
              <FrequencyItem
                key={index}
                city={freq.city}
                frequency={freq.frequency}
              />
            ))}
          </View>
        </View>

        {/* Contact */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="call" size={20} color="#10B981" />
            <Text style={styles.sectionTitle}>Contact</Text>
          </View>
          <View style={styles.contactList}>
            <ContactItem
              icon="call"
              label="Téléphone"
              value={RADIO_CONFIG.CONTACT.phone}
              onPress={handlePhone}
            />
            <ContactItem
              icon="mail"
              label="Email"
              value={RADIO_CONFIG.CONTACT.email}
              onPress={handleEmail}
            />
            <ContactItem
              icon="location"
              label="Adresse"
              value={RADIO_CONFIG.CONTACT.address}
            />
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 {RADIO_CONFIG.RADIO_NAME}
          </Text>
          <Text style={styles.footerSubtext}>
            Tous droits réservés
          </Text>
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
  logoHeader: {
    alignItems: 'center',
    marginTop: 30,
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    padding: 3,
  },
  logoInner: {
    flex: 1,
    borderRadius: 45,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10B981',
  },
  logoSubtext: {
    fontSize: 10,
    color: '#34D399',
    letterSpacing: 3,
  },
  stationName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    textAlign: 'center',
  },
  slogan: {
    fontSize: 14,
    color: '#10B981',
    marginTop: 4,
  },
  section: {
    marginTop: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  description: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 24,
    textAlign: 'justify',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  frequenciesList: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  frequencyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  frequencyCity: {
    fontSize: 15,
    color: '#D1D5DB',
  },
  frequencyValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#10B981',
  },
  contactList: {
    gap: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contactLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#6B7280',
  },
  footerSubtext: {
    fontSize: 11,
    color: '#4B5563',
    marginTop: 4,
  },
});

export default AboutScreen;
