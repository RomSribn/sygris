import React, { useEffect, useContext, useCallback } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Layout from '@components/Layout';
import { AuthContext, NodeContext } from '@context/index';
import { getNodes, nodeRequesting } from '@store/node/actions';
import { logout, logoutRequesting } from '@store/auth/actions';

import { privateRoutes, publicRoutes, RouteNames } from './utils';
/**
 * App router.
 * @returns {React.FC} Layout switch routes.
 */
const AppRouter: React.FC = () => {
  const {
    auth: { token },
    dispatch: authDispatch
  } = useContext(AuthContext);
  const {
    node: { error },
    dispatch: nodeDispatch
  } = useContext(NodeContext);
  const history = useHistory();
  const isAuth = !!token;

  const handleGetAllNodes = useCallback(async () => {
    if (token) {
      nodeDispatch(nodeRequesting({}));
      const result = await getNodes(token);
      nodeDispatch(result);
    }
  }, [token, nodeDispatch]);

  const handleLogOut = useCallback(async () => {
    if (token) {
      authDispatch(logoutRequesting({}));
      const result = await logout(token);
      authDispatch(result);
    }
  }, [authDispatch, token]);

  useEffect(() => {
    if (isAuth) {
      history.push(RouteNames.HOME);
      handleGetAllNodes();
    } else {
      history.push(RouteNames.LOGIN);
    }
  }, [handleGetAllNodes, history, isAuth]);

  useEffect(() => {
    if (error === 'Unauthorized') {
      handleLogOut();
    }
  }, [error, handleLogOut]);

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
