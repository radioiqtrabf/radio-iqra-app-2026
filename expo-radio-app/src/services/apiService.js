/**
 * API Service - Communication avec l'API AzuraCast
 */

import { RADIO_CONFIG } from '../constants/config';

/**
 * Récupère les informations du titre en cours
 */
export const getNowPlaying = async () => {
  try {
    const response = await fetch(
      `${RADIO_CONFIG.AZURACAST_API_BASE}${RADIO_CONFIG.NOW_PLAYING_ENDPOINT}`,
      {
        headers: {
          'X-API-Key': RADIO_CONFIG.AZURACAST_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`AzuraCast API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      success: true,
      data: {
        stationName: data.station?.name || RADIO_CONFIG.RADIO_NAME,
        currentSong: data.now_playing?.song?.text || 
                     `${data.now_playing?.song?.artist || ''} - ${data.now_playing?.song?.title || ''}`.trim() ||
                     'En direct...',
        title: data.now_playing?.song?.title || '',
        artist: data.now_playing?.song?.artist || '',
        artwork: data.now_playing?.song?.art || null,
        isLive: data.live?.is_live || false,
        streamerName: data.live?.streamer_name || '',
        listeners: data.listeners?.current || 0,
        elapsed: data.now_playing?.elapsed || 0,
        duration: data.now_playing?.duration || 0,
      },
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des informations:', error);
    return {
      success: false,
      error: error.message,
      data: {
        stationName: RADIO_CONFIG.RADIO_NAME,
        currentSong: 'En direct...',
        title: '',
        artist: '',
        artwork: null,
        isLive: false,
        streamerName: '',
        listeners: 0,
        elapsed: 0,
        duration: 0,
      },
    };
  }
};

export default {
  getNowPlaying,
};
