import React, { useEffect, useContext } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Layout from '@components/Layout';
import { AuthContext } from '@context/AuthContext';

import { privateRoutes, publicRoutes, RouteNames } from './utils';
/**
 * App router.
 * @returns {React.FC} Layout switch routes.
 */
const AppRouter: React.FC = () => {
  const { auth } = useContext(AuthContext);
  const history = useHistory();
  const isAuth = !!auth.token;

  useEffect(() => {
    if (isAuth) {
      history.push(RouteNames.HOME);
    } else {
      history.push(RouteNames.LOGIN);
    }
  }, [history, isAuth]);

  return isAuth ? (
    <Layout>
      <Switch>
        {privateRoutes.map((route) => (
          <Route path={route.path} exact={route.exact} component={route.component} key={route.path || '/404'} />
        ))}
        <Redirect to={RouteNames.HOME} />
      </Switch>
    </Layout>
  ) : (
    <Switch>
      {publicRoutes.map((route) => (
        <Route path={route.path} exact={route.exact} component={route.component} key={route.path || '/404'} />
      ))}
      <Redirect to={RouteNames.LOGIN} />
    </Switch>
  );
};

export { AppRouter };
