import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '@router/index';
import { saveToLocalStorage, loadFromLocalStorage, THEME_LAYOUT_LOCAL_STORAGE_KEY } from '@utils/localStorage';
import { AuthProvider, ThemeProvider, NodeProvider } from '@context/index';
import { TTheme } from '@utils/interfaces';
import { useAuthReducer } from '@store/auth/reducers';
import { useNodeReducer } from '@store/node/reducers';

import { App } from './App';

export interface MainProps {
  app: App;
}

const Main: React.FC<MainProps> = () => {
  const [auth, authDispatch] = useAuthReducer();
  const [node, nodeDispatch] = useNodeReducer();
  const [theme, setTheme] = useState<TTheme>(() => loadFromLocalStorage(THEME_LAYOUT_LOCAL_STORAGE_KEY) || 'light');

  const handleThemeSwitch = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveToLocalStorage(THEME_LAYOUT_LOCAL_STORAGE_KEY, newTheme);
  };

  return (
    <BrowserRouter>
      <AuthProvider value={{ auth, dispatch: authDispatch }}>
        <NodeProvider value={{ node, dispatch: nodeDispatch }}>
          <ThemeProvider
            value={{
              theme,
              updateTheme: handleThemeSwitch
            }}>
            <AppRouter />
          </ThemeProvider>
        </NodeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export { Main };
