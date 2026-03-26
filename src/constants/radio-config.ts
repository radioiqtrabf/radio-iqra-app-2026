/**
 * RADIO IQRA TV - Configuration Centralisée
 * Modifiez ces valeurs pour adapter l'application à une autre station
 */

export const RADIO_CONFIG = {
  // === INFORMATIONS DE LA STATION ===
  RADIO_NAME: "RADIO IQRA TV",
  SLOGAN: "La Voix du Saint Coran",
  DESCRIPTION: `Basée au cœur du Burkina Faso, RADIO IQRA TV est une station islamique dédiée à la diffusion des enseignements authentiques de l'Islam, dans un esprit de paix, de fraternité et d'éducation spirituelle. Fidèle à sa mission, notre radio-télévision tire son nom de l'impératif divin "Iqra" (Lis), qui rappelle l'importance de la connaissance dans l'épanouissement de la foi et de la société.`,
  
  // === FRÉQUENCES ===
  FREQUENCIES: [
    { city: "Ouagadougou", frequency: "FM 92.5" },
    { city: "Bobo-Dioulasso", frequency: "FM 88.3" },
  ],
  
  // === FLUX AUDIO ===
  STREAM_URL: "https://a10.asurahosting.com:8170/radio.mp3",
  STREAM_TYPE: "audio/mpeg",
  
  // === API AZURACAST ===
  AZURACAST_API_BASE: "https://a10.asurahosting.com:8170",
  AZURACAST_API_KEY: "93603a6dea6d0f08:6ce0854f92ad65c2404f9edbd34d0a53",
  NOW_PLAYING_ENDPOINT: "/api/nowplaying/1",
  
  // === RÉSEAUX SOCIAUX ===
  SOCIAL: {
    WEBSITE: {
      label: "Site Web",
      url: "https://radioiqraburkina.com",
      icon: "globe-outline",
    },
    FACEBOOK: {
      label: "Facebook",
      url: "https://facebook.com/profile.php?id=61571862830361",
      icon: "logo-facebook",
    },
    INSTAGRAM: {
      label: "Instagram",
      url: "https://instagram.com/radioiqratv_officielle?igsh=bTB1NDF6aGNtM3Uy",
      icon: "logo-instagram",
    },
    TWITTER: {
      label: "X (Twitter)",
      url: "https://x.com/iqra_radio4578",
      icon: "logo-twitter",
    },
    TIKTOK: {
      label: "TikTok",
      url: "https://tiktok.com/@radio.iqra.tv?is_from_webapp=1&sender_device=pc",
      icon: "logo-tiktok",
    },
    YOUTUBE: {
      label: "YouTube",
      url: "https://www.youtube.com/@RADIOIQRA-TV",
      icon: "logo-youtube",
    },
    WHATSAPP: {
      label: "WhatsApp",
      url: "https://whatsapp.com/channel/0029Vb7gQcWBadmjd7KH3443",
      icon: "logo-whatsapp",
    },
  },
  
  // === CONTACT ===
  CONTACT: {
    email: "radioiqra07@gmail.com",
    phone: "+226 76 01 12 08",
    address: "Ouagadougou, Burkina Faso",
  },
  
  // === ACTUALITÉS (Derniers Posts/Vidéos) ===
  NEWS: {
    FACEBOOK_PAGE_URL: "https://www.facebook.com/profile.php?id=61571862830361",
    YOUTUBE_VIDEO_IDS: ["VOTRE_ID_VIDEO_YOUTUBE"], // Remplacez par les IDs des vidéos
    TIKTOK_VIDEO_IDS: ["VOTRE_ID_VIDEO_TIKTOK"],
  },
  
  // === PROGRAMMES ===
  PROGRAMS: [
    {
      id: 1,
      title: "Coran du Matin",
      time: "05:00 - 06:30",
      description: "Récitation et Tafsir du Saint Coran",
      icon: "book-outline",
    },
    {
      id: 2,
      title: "Hadiths et Enseignements",
      time: "07:00 - 08:00",
      description: "Étude des hadiths authentiques",
      icon: "library-outline",
    },
    {
      id: 3,
      title: "Émission Culturelle",
      time: "09:00 - 10:30",
      description: "Découverte de la richesse culturelle musulmane du Burkina Faso",
      icon: "people-outline",
    },
    {
      id: 4,
      title: "Conférences et Témoignages",
      time: "11:00 - 12:00",
      description: "Discours inspirants et partages d'expériences",
      icon: "mic-outline",
    },
    {
      id: 5,
      title: "Prières et Invocations",
      time: "12:30 - 13:30",
      description: "Moment de prière et d'invocations",
      icon: "heart-outline",
    },
    {
      id: 6,
      title: "Soutien Communautaire",
      time: "14:00 - 15:30",
      description: "Informations locales et initiatives caritatives",
      icon: "hand-left-outline",
    },
    {
      id: 7,
      title: "Conseils Sociaux",
      time: "16:00 - 17:00",
      description: "Guidance et conseils pour la vie quotidienne",
      icon: "chatbubbles-outline",
    },
    {
      id: 8,
      title: "Coran du Soir",
      time: "18:00 - 19:30",
      description: "Récitation et méditation du Saint Coran",
      icon: "moon-outline",
    },
    {
      id: 9,
      title: "Nuit Spirituelle",
      time: "21:00 - 23:00",
      description: "Programmes nocturnes de spiritualité",
      icon: "star-outline",
    },
  ],
  
  // === THÈME ===
  THEME: {
    primaryColor: "#10B981", // Vert emeraude
    secondaryColor: "#059669",
    accentColor: "#34D399",
    backgroundColor: "#0f0f0f",
    cardBackground: "rgba(255, 255, 255, 0.05)",
  },
};

export type RadioConfig = typeof RADIO_CONFIG;
