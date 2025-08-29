import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localizationStrings from './LocalizationString';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr'); // Default language: French

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('Lng');
        const selectedLanguage = storedLanguage || 'fr'; // Use 'fr' if no language saved
        setLanguage(selectedLanguage);
        localizationStrings.setLanguage(selectedLanguage);
      } catch (e) {
        console.error('Error loading language:', e);
        setLanguage('fr');
        localizationStrings.setLanguage('fr');
      }
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (newLanguage) => {
    setLanguage(newLanguage);
    localizationStrings.setLanguage(newLanguage);
    await AsyncStorage.setItem('Lng', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
