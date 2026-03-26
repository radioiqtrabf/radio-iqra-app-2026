# RADIO IQRA TV - Application Mobile

Application mobile pour la station de radio islamique **RADIO IQRA TV** basée au Burkina Faso.

## 🎯 Fonctionnalités

- ✅ **Lecteur Audio** - Streaming en direct avec support de l'audio en arrière-plan
- ✅ **Now Playing** - Affichage du titre en cours (actualisé toutes les 15s via API AzuraCast)
- ✅ **Grille des Programmes** - Liste des émissions quotidiennes
- ✅ **À Propos** - Informations sur la station, fréquences et contacts
- ✅ **Réseaux Sociaux** - Liens vers WhatsApp, Facebook, YouTube et site web
- ✅ **Design Dark Mode** - Interface moderne avec Glassmorphism
- ✅ **Animations Fluides** - Transitions et effets visuels élégants

## 📱 Captures d'écran

L'application présente un design moderne avec:
- Un lecteur circulaire animé avec le logo de la radio
- Un visualiseur audio en temps réel
- Des cartes avec effet de verre (Glassmorphism)
- Une navigation par onglets intuitive

## 🚀 Installation

### Prérequis

- Node.js (v18+)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Compte Expo (pour EAS Build)

### Étapes d'installation

1. **Cloner ou copier le projet**
```bash
cd expo-radio-app
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
# ou avec bun
bun install
```

3. **Lancer en mode développement**
```bash
npx expo start
```

4. **Scanner le QR code** avec l'application Expo Go sur votre téléphone

## 🔧 Configuration

Toutes les variables de configuration sont centralisées dans `src/constants/config.js`:

```javascript
export const RADIO_CONFIG = {
  RADIO_NAME: "RADIO IQRA TV",
  SLOGAN: "La Voix du Saint Coran",
  STREAM_URL: "https://a10.asurahosting.com:8170/radio.mp3",
  AZURACAST_API_BASE: "https://a10.asurahosting.com:8170",
  AZURACAST_API_KEY: "votre-cle-api",
  SOCIAL: {
    WEBSITE: { url: "https://votre-site.com" },
    FACEBOOK: { url: "https://facebook.com/votre-page" },
    // ...
  },
  // ...
};
```

### Pour adapter à une autre station:

1. Modifiez les valeurs dans `src/constants/config.js`
2. Remplacez les assets (logo, splash screen) dans `assets/`
3. Mettez à jour `app.json` avec le nouveau nom et identifiants

## 📦 Build de production (EAS)

### Configuration EAS

1. **Installer EAS CLI**
```bash
npm install -g eas-cli
```

2. **Se connecter à Expo**
```bash
eas login
```

3. **Configurer le projet**
```bash
eas build:configure
```

4. **Mettre à jour l'ID du projet** dans `app.json`:
```json
{
  "expo": {
    "extra": {
      "eas": {
        "projectId": "votre-project-id"
      }
    }
  }
}
```

### Build Android (APK/AAB)
```bash
eas build --platform android
```

### Build iOS (IPA)
```bash
eas build --platform ios
```

### Build pour les deux plateformes
```bash
eas build --platform all
```

## 📁 Structure du projet

```
expo-radio-app/
├── App.js                      # Point d'entrée principal
├── app.json                    # Configuration Expo
├── package.json                # Dépendances
├── assets/                     # Images et icônes
│   ├── icon.png
│   ├── splash.png
│   ├── adaptive-icon.png
│   └── favicon.png
└── src/
    ├── constants/
    │   └── config.js           # Configuration centralisée
    ├── services/
    │   ├── radioService.js     # Gestion du lecteur audio
    │   ├── apiService.js       # API AzuraCast
    │   └── notificationService.js # Notifications push
    ├── screens/
    │   ├── RadioScreen.js      # Écran principal (lecteur)
    │   ├── ProgramsScreen.js   # Grille des programmes
    │   └── AboutScreen.js      # À propos
    └── components/             # Composants réutilisables
```

## 🎨 Thème et Design

L'application utilise un thème sombre avec:
- **Couleur principale**: `#10B981` (Vert émeraude)
- **Couleur secondaire**: `#059669`
- **Fond**: `#0f0f0f`
- **Effet Glassmorphism**: `rgba(255, 255, 255, 0.05)`

## 🔐 Permissions

### iOS
- `UIBackgroundModes: ["audio"]` - Audio en arrière-plan

### Android
- `INTERNET` - Streaming audio
- `ACCESS_NETWORK_STATE` - Vérification de connexion
- `WAKE_LOCK` - Maintenir l'audio actif
- `FOREGROUND_SERVICE` - Service de lecture

## 📞 Support

Pour toute question ou assistance:
- **Email**: contact@radioiqraburkina.com
- **Téléphone**: +226 76 01 12 08
- **Site Web**: https://radioiqraburkina.com

## 📄 Licence

Ce projet est développé pour RADIO IQRA TV. Tous droits réservés © 2024.

---

Développé avec ❤️ pour la communauté musulmane du Burkina Faso.
