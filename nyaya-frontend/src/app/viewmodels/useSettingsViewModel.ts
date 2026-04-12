import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'color-blind';
type Language = 'en' | 'hi';

export function useSettingsViewModel() {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedTheme = (localStorage.getItem('nyaya_theme') as Theme) || 'light';
    const savedLang = (localStorage.getItem('nyaya_lang') as Language) || 'en';
    
    setTheme(savedTheme);
    setLanguage(savedLang);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    root.classList.remove('dark', 'color-blind');
    if (newTheme !== 'light') {
      root.classList.add(newTheme);
    }
    localStorage.setItem('nyaya_theme', newTheme);
    setTheme(newTheme);
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    localStorage.setItem('nyaya_lang', newLang);
    setLanguage(newLang);
    window.dispatchEvent(new Event('languageChange')); // Triggers re-render across app
  };

  return { theme, applyTheme, language, toggleLanguage };
}