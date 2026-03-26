/**
 * RADIO IQRA TV - Application Mobile
 * Développée avec Expo SDK 51+
 * Design: Dark Mode avec Glassmorphism
 */

import React, { useState } from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import RadioScreen from './src/screens/RadioScreen';
import ProgramsScreen from './src/screens/ProgramsScreen';
import AboutScreen from './src/screens/AboutScreen';
import { RADIO_CONFIG } from './src/constants/config';

const Tab = createBottomTabNavigator();

// Tab Bar Component avec style personnalisé
function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom + 8 }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const getIcon = () => {
          switch (route.name) {
            case 'Radio':
              return isFocused ? 'radio' : 'radio-outline';
            case 'Programmes':
              return isFocused ? 'time' : 'time-outline';
            case 'À propos':
              return isFocused ? 'heart' : 'heart-outline';
            default:
              return 'ellipse';
          }
        };

        return (
          <View key={route.key} style={styles.tabItem}>
            <View
              style={[styles.tabButton, isFocused && styles.tabButtonActive]}
              onTouchEnd={onPress}
            >
              <Ionicons
                name={getIcon()}
                size={22}
                color={isFocused ? '#10B981' : '#6B7280'}
              />
              <View style={[styles.tabLabelContainer, isFocused && styles.tabLabelActive]}>
                <View style={[styles.tabDot, isFocused && styles.tabDotActive]} />
                <View style={[styles.tabIndicator, isFocused && styles.tabIndicatorActive]} />
              </View>
              <View style={styles.tabLabelWrapper}>
                <View style={[styles.tabIndicatorTop, isFocused && styles.tabIndicatorTopActive]} />
              </View>
            </View>
            <View style={[styles.tabLabelContainer, isFocused && styles.tabLabelActive]}>
              <View style={[styles.tabLabelDot, isFocused && styles.tabLabelDotActive]} />
            </View>
          </View>
        );
      })}
    </View>
  );
}

// Main App Component
function AppContent() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Radio"
          component={RadioScreen}
          options={{
            tabBarLabel: 'Radio',
          }}
        />
        <Tab.Screen
          name="Programmes"
          component={ProgramsScreen}
          options={{
            tabBarLabel: 'Programmes',
          }}
        />
        <Tab.Screen
          name="À propos"
          component={AboutScreen}
          options={{
            tabBarLabel: 'À propos',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Root App Component
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(17, 17, 17, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabButton: {
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 20,
  },
  tabButtonActive: {
    // Active state styles
  },
  tabLabelContainer: {
    marginTop: 4,
    alignItems: 'center',
  },
  tabLabelActive: {
    // Active label styles
  },
  tabDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  tabDotActive: {
    backgroundColor: '#10B981',
  },
  tabIndicator: {
    width: 0,
    height: 0,
  },
  tabIndicatorActive: {
    width: 24,
    height: 2,
    backgroundColor: '#10B981',
    borderRadius: 1,
    marginTop: 4,
  },
  tabLabelWrapper: {
    position: 'absolute',
    top: -12,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  tabIndicatorTop: {
    width: 0,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'transparent',
  },
  tabIndicatorTopActive: {
    width: 32,
    backgroundColor: '#10B981',
  },
  tabLabelDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  tabLabelDotActive: {
    backgroundColor: '#10B981',
  },
});
