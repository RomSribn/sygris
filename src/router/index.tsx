import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Layout from '@components/Layout';

import { privateRoutes, publicRoutes, RouteNames } from './utils';
/**
 * App router.
 * @returns {React.FC} Layout switch routes.
 */
const AppRouter: React.FC = () => {
  const history = useHistory();
  const isAuth = true;

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
