/**
 * Radio Screen - Écran principal du lecteur radio
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Linking,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RadioService from '../services/radioService';
import { getNowPlaying } from '../services/apiService';
import { RADIO_CONFIG } from '../constants/config';

const { width } = Dimensions.get('window');

// Animated Logo Component
const AnimatedLogo = ({ isPlaying }) => {
  const pulseAnim = useState(new Animated.Value(1))[0];
  const rotateAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (isPlaying) {
      // Pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Rotation animation
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 20000,
          useNativeDriver: true,
        })
      ).start();
    } else {
      pulseAnim.setValue(1);
      rotateAnim.setValue(0);
    }
  }, [isPlaying]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.logoContainer}>
      {/* Outer glow */}
      {isPlaying && (
        <Animated.View
          style={[
            styles.logoGlow,
            {
              transform: [{ scale: pulseAnim }],
              opacity: pulseAnim.interpolate({
                inputRange: [1, 1.1],
                outputRange: [0.3, 0.5],
              }),
            },
          ]}
        />
      )}
      
      {/* Main logo */}
      <Animated.View
        style={[
          styles.logoMain,
          { transform: [{ scale: pulseAnim }, { rotate: rotation }] },
        ]}
      >
        <LinearGradient
          colors={['#10B981', '#059669', '#14B8A6']}
          style={styles.logoGradient}
        >
          <View style={styles.logoInner}>
            <Text style={styles.logoText}>IQRA</Text>
            <Text style={styles.logoSubtext}>TV</Text>
            <Text style={styles.logoRadio}>RADIO</Text>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Live indicator */}
      {isPlaying && (
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>EN DIRECT</Text>
        </View>
      )}
    </View>
  );
};

// Audio Visualizer
const AudioVisualizer = ({ isPlaying }) => {
  const bars = 12;
  const animations = useState(
    Array.from({ length: bars }, () => new Animated.Value(8))
  )[0];

  useEffect(() => {
    if (isPlaying) {
      animations.forEach((anim, i) => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: Math.random() * 30 + 10,
              duration: 300 + Math.random() * 200,
              useNativeDriver: false,
            }),
            Animated.timing(anim, {
              toValue: 8,
              duration: 300 + Math.random() * 200,
              useNativeDriver: false,
            }),
          ])
        ).start();
      });
    } else {
      animations.forEach((anim) => {
        Animated.timing(anim, {
          toValue: 8,
          duration: 200,
          useNativeDriver: false,
        }).start();
      });
    }
  }, [isPlaying]);

  return (
    <View style={styles.visualizer}>
      {animations.map((anim, i) => (
        <Animated.View
          key={i}
          style={[
            styles.visualizerBar,
            { height: anim },
          ]}
        />
      ))}
    </View>
  );
};

// Now Playing Component
const NowPlaying = ({ data, isLoading }) => {
  return (
    <View style={styles.nowPlayingContainer}>
      <View style={styles.nowPlayingHeader}>
        {data?.isLive ? (
          <View style={styles.liveBadge}>
            <View style={styles.liveBadgeDot} />
            <Text style={styles.liveBadgeText}>LIVE</Text>
          </View>
        ) : (
          <View style={styles.onAirBadge}>
            <Ionicons name="radio" size={12} color="#10B981" />
            <Text style={styles.onAirBadgeText}>EN DIFFUSION</Text>
          </View>
        )}
        {data?.listeners > 0 && (
          <View style={styles.listenersContainer}>
            <Ionicons name="people" size={12} color="#9CA3AF" />
            <Text style={styles.listenersText}>{data.listeners} auditeurs</Text>
          </View>
        )}
      </View>

      <Text style={styles.songTitle} numberOfLines={2}>
        {data?.currentSong || 'En direct...'}
      </Text>

      {data?.streamerName && (
        <View style={styles.streamerContainer}>
          <Ionicons name="mic" size={14} color="#10B981" />
          <Text style={styles.streamerText}>{data.streamerName}</Text>
        </View>
      )}

      <AudioVisualizer isPlaying={true} />
    </View>
  );
};

// Control Button
const ControlButton = ({ icon, onPress, variant = 'primary', disabled = false }) => {
  const getStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.controlSecondary;
      case 'danger':
        return styles.controlDanger;
      default:
        return styles.controlPrimary;
    }
  };

  const getIconColor = () => {
    return '#FFFFFF';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.controlButton, getStyle(), disabled && styles.controlDisabled]}
      activeOpacity={0.7}
    >
      <Ionicons name={icon} size={28} color={getIconColor()} />
    </TouchableOpacity>
  );
};

// Social Button
const SocialButton = ({ icon, label, onPress, color }) => {
  return (
    <TouchableOpacity
      style={styles.socialButton}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={color}
        style={styles.socialIconContainer}
      >
        <Ionicons name={icon} size={22} color="#FFFFFF" />
      </LinearGradient>
      <Text style={styles.socialLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

// Main Screen Component
const RadioScreen = () => {
  const insets = useSafeAreaInsets();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nowPlaying, setNowPlaying] = useState(null);

  // Configure audio on mount
  useEffect(() => {
    RadioService.configureAudio();
    
    return () => {
      RadioService.cleanup();
    };
  }, []);

  // Fetch now playing data
  useEffect(() => {
    let mounted = true;
    
    const fetchData = async () => {
      const result = await getNowPlaying();
      if (mounted && result.success) {
        setNowPlaying(result.data);
      }
    };
    
    fetchData();
    const interval = setInterval(fetchData, 15000);
    
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  // Playback controls
  const handlePlay = async () => {
    setIsLoading(true);
    const success = await RadioService.play();
    if (success) {
      setIsPlaying(true);
    }
    setIsLoading(false);
  };

  const handlePause = async () => {
    await RadioService.pause();
    setIsPlaying(false);
  };

  const handleStop = async () => {
    await RadioService.stop();
    setIsPlaying(false);
  };

  // Social link handlers
  const openWebsite = () => Linking.openURL(RADIO_CONFIG.SOCIAL.WEBSITE.url);
  const openFacebook = () => Linking.openURL(RADIO_CONFIG.SOCIAL.FACEBOOK.url);
  const openYouTube = () => Linking.openURL(RADIO_CONFIG.SOCIAL.YOUTUBE.url);
  const openWhatsApp = () => {
    const url = `https://wa.me/${RADIO_CONFIG.SOCIAL.WHATSAPP.number.replace(/\+/g, '')}?text=${encodeURIComponent(RADIO_CONFIG.SOCIAL.WHATSAPP.message)}`;
    Linking.openURL(url);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <AnimatedLogo isPlaying={isPlaying} />

        {/* Station Name */}
        <Text style={styles.stationName}>{RADIO_CONFIG.RADIO_NAME}</Text>
        <Text style={styles.slogan}>{RADIO_CONFIG.SLOGAN}</Text>

        {/* Now Playing */}
        <NowPlaying data={nowPlaying} isLoading={isLoading} />

        {/* Controls */}
        <View style={styles.controlsContainer}>
          {isPlaying ? (
            <>
              <ControlButton
                icon="pause"
                onPress={handlePause}
                variant="secondary"
              />
              <ControlButton
                icon="stop"
                onPress={handleStop}
                variant="danger"
              />
            </>
          ) : (
            <ControlButton
              icon={isLoading ? 'hourglass' : 'play'}
              onPress={handlePlay}
              variant="primary"
              disabled={isLoading}
            />
          )}
        </View>

        {/* Social Links */}
        <View style={styles.socialContainer}>
          <Text style={styles.socialTitle}>Suivez-nous</Text>
          <View style={styles.socialGrid}>
            <SocialButton
              icon="globe"
              label="Site"
              onPress={openWebsite}
              color={['#3B82F6', '#1D4ED8']}
            />
            <SocialButton
              icon="logo-facebook"
              label="Facebook"
              onPress={openFacebook}
              color={['#1877F2', '#0E5FC2']}
            />
            <SocialButton
              icon="logo-youtube"
              label="YouTube"
              onPress={openYouTube}
              color={['#EF4444', '#DC2626']}
            />
            <SocialButton
              icon="logo-whatsapp"
              label="WhatsApp"
              onPress={openWhatsApp}
              color={['#25D366', '#128C7E']}
            />
          </View>
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
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  logoGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(16, 185, 129, 0.3)',
  },
  logoMain: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  logoGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 80,
    padding: 4,
  },
  logoInner: {
    flex: 1,
    borderRadius: 76,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#10B981',
  },
  logoSubtext: {
    fontSize: 12,
    color: '#34D399',
    letterSpacing: 4,
  },
  logoRadio: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },
  liveIndicator: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginRight: 6,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  stationName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 30,
    textAlign: 'center',
  },
  slogan: {
    fontSize: 14,
    color: '#10B981',
    marginTop: 4,
  },
  nowPlayingContainer: {
    width: '100%',
    maxWidth: 350,
    marginTop: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  nowPlayingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
    marginRight: 6,
  },
  liveBadgeText: {
    color: '#EF4444',
    fontSize: 10,
    fontWeight: '600',
  },
  onAirBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  onAirBadgeText: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  listenersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  listenersText: {
    color: '#9CA3AF',
    fontSize: 11,
    marginLeft: 4,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  streamerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  streamerText: {
    color: '#10B981',
    fontSize: 13,
    marginLeft: 6,
  },
  visualizer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    gap: 3,
  },
  visualizerBar: {
    width: 3,
    backgroundColor: '#10B981',
    borderRadius: 2,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    gap: 20,
  },
  controlButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlPrimary: {
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  controlSecondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  controlDanger: {
    backgroundColor: '#EF4444',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  controlDisabled: {
    opacity: 0.5,
  },
  socialContainer: {
    width: '100%',
    maxWidth: 350,
    marginTop: 40,
  },
  socialTitle: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 12,
    marginBottom: 16,
  },
  socialGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
  },
  socialIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialLabel: {
    color: '#9CA3AF',
    fontSize: 10,
    marginTop: 8,
  },
});

export default RadioScreen;
