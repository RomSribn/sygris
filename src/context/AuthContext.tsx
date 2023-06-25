import React from 'react';
import { initialState, IState, TAuthDispatch } from '@store/auth/reducers';

type TAuthContext = {
  /**
   * auth store.
   */
  auth: IState;
  /**
   * auth store updating dispatch
   */
  dispatch: TAuthDispatch;
};

const AuthContext: React.Context<TAuthContext> = React.createContext({
  auth: initialState,
  dispatch: ((data) => data) as TAuthDispatch
});
const AuthProvider = AuthContext.Provider;
/**
 * Consumer for auth store contexts providing.
 * @param {TAuthContext['auth']} auth Auth store.
 * @param {TAuthContext['dispatch']} dispatch Auth store updating dispatch.
 */
const AuthConsumer = AuthContext.Consumer;

export { AuthContext, AuthProvider, AuthConsumer };
