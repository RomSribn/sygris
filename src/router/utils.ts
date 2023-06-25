import React from 'react';
import { Home, SignIn, SignUp, NotFound } from '@pages/index';

export interface IRoute {
  path?: string;
  component: React.ComponentType;
  exact?: boolean;
}

export enum RouteNames {
  HOME = '/',
  LOGIN = '/login',
  SIGN_UP = '/signup',
  NOT_FOUND = '/404'
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.LOGIN, exact: true, component: SignIn },
  { path: RouteNames.SIGN_UP, exact: true, component: SignUp }
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.HOME, exact: true, component: Home },
  { component: NotFound }
];
