import { NextResponse } from 'next/server';
import { RADIO_CONFIG } from '@/constants/radio-config';

interface AzuraCastNowPlaying {
  station: {
    name: string;
    listen_url: string;
  };
  now_playing: {
    song: {
      title: string;
      artist: string;
      text: string;
      art: string;
    };
    elapsed: number;
    duration: number;
  } | null;
  listeners: {
    current: number;
    unique: number;
    total: number;
  };
  live: {
    is_live: boolean;
    streamer_name: string;
  };
}

export async function GET() {
  try {
    const response = await fetch(
      `${RADIO_CONFIG.AZURACAST_API_BASE}${RADIO_CONFIG.NOW_PLAYING_ENDPOINT}`,
      {
        headers: {
          'X-API-Key': RADIO_CONFIG.AZURACAST_API_KEY,
        },
        // Cache for 5 seconds to avoid too many requests
        next: { revalidate: 5 },
      }
    );

    if (!response.ok) {
      throw new Error(`AzuraCast API error: ${response.status}`);
    }

    const data: AzuraCastNowPlaying = await response.json();

    return NextResponse.json({
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
    });
  } catch (error) {
    console.error('Error fetching now playing:', error);
    return NextResponse.json({
      success: false,
      error: 'Impossible de récupérer les informations',
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
    });
  }
}
