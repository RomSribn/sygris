import { httpClient, httpClientAuthorized } from '@services/httpService';
import { IUser } from '@utils/interfaces';
import { saveToLocalStorage, TOKEN_LOCAL_STORAGE_KEY } from '@utils/localStorage';

import { createAction } from '../utils';
import {
  AUTHENTICATE_REQUESTING,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_ERROR,
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGOUT_REQUESTING,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
} from './action_types';

export const authRequesting = createAction(AUTHENTICATE_REQUESTING);
export const authSuccess = createAction(AUTHENTICATE_SUCCESS);
export const authError = createAction(AUTHENTICATE_ERROR);

export const signupRequesting = createAction(SIGNUP_REQUESTING);
export const signupSuccess = createAction(SIGNUP_SUCCESS);
export const signupError = createAction(SIGNUP_ERROR);

export const logoutRequesting = createAction(LOGOUT_REQUESTING);
export const logoutSuccess = createAction(LOGOUT_SUCCESS);
export const logoutError = createAction(LOGOUT_ERROR);

export const loginRequesting = () => authRequesting({});
export const signUpRequesting = () => signupRequesting({});

export const login = async (data: IUser) => {
  try {
    const user = await httpClient.post('/auth/login', data);
    return authSuccess({ email: data.email, token: user.data.access_token });
  } catch (error) {
    return authError({ error });
  }
};

export const signup = async (data: IUser) => {
  try {
    const user = await httpClient.post('/user', data);
    return signupSuccess(user);
  } catch (error) {
    return signupError({ error });
  }
};

export const logout = async (token: string) => {
  try {
    // TODO: invalid logout server route
    // const response = await httpClientAuthorized(token).post('/logout');
    saveToLocalStorage(TOKEN_LOCAL_STORAGE_KEY, '');
    return logoutSuccess({});
  } catch (error) {
    return logoutError({ error });
  }
};

export type AuthActionTypes = ReturnType<
  | typeof authRequesting
  | typeof authSuccess
  | typeof authError
  | typeof signupRequesting
  | typeof signupSuccess
  | typeof signupError
  | typeof logoutRequesting
  | typeof logoutSuccess
  | typeof logoutError
>;
