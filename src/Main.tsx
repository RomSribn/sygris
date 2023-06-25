import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '@router/index';
import { saveToLocalStorage, loadFromLocalStorage, THEME_LAYOUT_LOCAL_STORAGE_KEY } from '@utils/localStorage';
import { ThemeProvider } from '@context/ThemeContext';
import { AuthProvider } from '@context/AuthContext';
import { TTheme } from '@utils/interfaces';
import { useAuthReducer } from '@store/auth/reducers';

import { App } from './App';

export interface MainProps {
  app: App;
}

const Main: React.FC<MainProps> = () => {
  const [auth, dispatch] = useAuthReducer();
  const [theme, setTheme] = useState<TTheme>(() => loadFromLocalStorage(THEME_LAYOUT_LOCAL_STORAGE_KEY) || 'light');

  const handleThemeSwitch = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveToLocalStorage(THEME_LAYOUT_LOCAL_STORAGE_KEY, newTheme);
  };

  return (
    <BrowserRouter>
      <AuthProvider value={{ auth, dispatch }}>
        <ThemeProvider
          value={{
            theme,
            updateTheme: handleThemeSwitch
          }}>
          <AppRouter />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export { Main };
