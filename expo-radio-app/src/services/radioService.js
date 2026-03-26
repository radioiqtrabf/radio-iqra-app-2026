/**
 * Radio Service - Gestion du lecteur audio avec expo-av
 * Support de l'audio en arrière-plan pour iOS et Android
 */

import { Audio } from 'expo-av';
import { Platform } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { RADIO_CONFIG } from '../constants/config';

// Constants
const BACKGROUND_AUDIO_TASK = 'BACKGROUND_AUDIO_TASK';

// State
let sound = null;
let isPlaying = false;
let onPlaybackStatusUpdate = null;

/**
 * Configure l'audio pour la lecture en arrière-plan
 */
export const configureAudio = async () => {
  try {
    // Configuration du mode audio
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
    
    console.log('Audio configuré pour la lecture en arrière-plan');
  } catch (error) {
    console.error('Erreur lors de la configuration audio:', error);
  }
};

/**
 * Callback pour les mises à jour de statut
 */
export const setOnPlaybackStatusUpdate = (callback) => {
  onPlaybackStatusUpdate = callback;
};

/**
 * Charge et prépare le flux audio
 */
export const loadStream = async () => {
  try {
    if (sound) {
      await sound.unloadAsync();
    }
    
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: RADIO_CONFIG.STREAM_URL },
      {
        shouldPlay: false,
        volume: 1.0,
        isLooping: false,
      },
      (status) => {
        if (onPlaybackStatusUpdate) {
          onPlaybackStatusUpdate(status);
        }
      }
    );
    
    sound = newSound;
    console.log('Flux audio chargé');
    return true;
  } catch (error) {
    console.error('Erreur lors du chargement du flux:', error);
    return false;
  }
};

/**
 * Lance la lecture du flux
 */
export const play = async () => {
  try {
    if (!sound) {
      await loadStream();
    }
    
    if (sound) {
      await sound.playAsync();
      isPlaying = true;
      console.log('Lecture démarrée');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erreur lors de la lecture:', error);
    return false;
  }
};

/**
 * Met en pause la lecture
 */
export const pause = async () => {
  try {
    if (sound) {
      await sound.pauseAsync();
      isPlaying = false;
      console.log('Lecture en pause');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erreur lors de la mise en pause:', error);
    return false;
  }
};

/**
 * Arrête complètement la lecture et libère les ressources
 */
export const stop = async () => {
  try {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      sound = null;
      isPlaying = false;
      console.log('Lecture arrêtée');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erreur lors de l\'arrêt:', error);
    return false;
  }
};

/**
 * Récupère l'état de lecture actuel
 */
export const getIsPlaying = () => isPlaying;

/**
 * Récupère la position actuelle
 */
export const getStatus = async () => {
  try {
    if (sound) {
      return await sound.getStatusAsync();
    }
    return null;
  } catch (error) {
    console.error('Erreur lors de la récupération du statut:', error);
    return null;
  }
};

/**
 * Nettoie les ressources audio
 */
export const cleanup = async () => {
  try {
    if (sound) {
      await sound.unloadAsync();
      sound = null;
      isPlaying = false;
    }
    console.log('Ressources audio libérées');
  } catch (error) {
    console.error('Erreur lors du nettoyage:', error);
  }
};

export default {
  configureAudio,
  loadStream,
  play,
  pause,
  stop,
  getIsPlaying,
  getStatus,
  setOnPlaybackStatusUpdate,
  cleanup,
};
