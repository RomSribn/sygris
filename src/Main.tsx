import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '@router/index';
import { saveToLocalStorage } from '@utils/localStorage';
import { ThemeProvider } from '@context/ThemeContext';
import { TTheme } from '@utils/interfaces';

import { App } from './App';

export interface MainProps {
  app: App;
}

const Main: React.FC<MainProps> = () => {
  const theme: TTheme = 'light';

  const handleThemeSwitch = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    saveToLocalStorage('theme', newTheme);
  };

  return (
    <BrowserRouter>
      <ThemeProvider
        value={{
          theme,
          updateTheme: handleThemeSwitch
        }}>
        <AppRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export { Main };
