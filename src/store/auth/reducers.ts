import { useReducer, Dispatch } from 'react';
import { TOKEN_LOCAL_STORAGE_KEY, loadFromLocalStorage } from '@utils/localStorage';

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
import { AuthActionTypes } from './actions';

type TAuthDispatch = Dispatch<AuthActionTypes>;

interface IState {
  email: string | null;
  token: string | null;
  error: string;
  isLoading: boolean;
}

const token: string = loadFromLocalStorage(TOKEN_LOCAL_STORAGE_KEY);

const initialState: IState = {
  email: null,
  token,
  error: '',
  isLoading: false
};

const handleActions = (state: IState, action: AuthActionTypes): IState => {
  const reducer = {
    [AUTHENTICATE_REQUESTING]: {
      ...state,
      isLoading: true
    },
    [AUTHENTICATE_SUCCESS]: {
      ...state,
      token: action.payload.token,
      email: action.payload.email,
      isLoading: false
    },
    [AUTHENTICATE_ERROR]: {
      ...state,
      error: action.payload.error,
      isLoading: false
    },
    [SIGNUP_REQUESTING]: {
      ...state,
      isLoading: true
    },
    [SIGNUP_SUCCESS]: {
      ...state,
      email: action.payload.email,
      isLoading: false
    },
    [SIGNUP_ERROR]: {
      ...state,
      error: action.payload.error,
      isLoading: false
    },
    [LOGOUT_REQUESTING]: {
      ...state,
      isLoading: true
    },
    [LOGOUT_SUCCESS]: {
      ...state,
      token: null,
      email: null,
      isLoading: false
    },
    [LOGOUT_ERROR]: {
      ...state,
      error: action.payload.error,
      isLoading: false
    }
  };

  return reducer[action.type] || state;
};

const useAuthReducer = (): [IState, TAuthDispatch] => useReducer(handleActions, initialState);

export { useAuthReducer, initialState };
export type { IState, TAuthDispatch };
