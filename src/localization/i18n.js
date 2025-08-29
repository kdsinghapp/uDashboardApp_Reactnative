// // src/localization/i18n.js
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import * as RNLocalize from 'react-native-localize';
// import en from './en.json';
// import fr from './fr.json';

// const resources = {
//   en: { translation: en },
//   fr: { translation: fr },
// };

// const fallback = { languageTag: 'en', isRTL: false };

// const { languageTag } =
//   RNLocalize.findBestAvailableLanguage(Object.keys(resources)) || fallback;

// i18n
//   .use(initReactI18next)
//   .init({
//     compatibilityJSON: 'v3',
//     resources,
//     lng: languageTag,
//     fallbackLng: 'en',
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// export default i18n;
