import React, { useEffect, useContext, useCallback } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Layout from '@components/Layout';
import { AuthContext, NodeContext } from '@context/index';
import { getNodes, nodeRequesting } from '@store/node/actions';

import { privateRoutes, publicRoutes, RouteNames } from './utils';
/**
 * App router.
 * @returns {React.FC} Layout switch routes.
 */
const AppRouter: React.FC = () => {
  const { auth } = useContext(AuthContext);
  const { dispatch } = useContext(NodeContext);
  const history = useHistory();
  const isAuth = !!auth.token;

  const handleGetAllNodes = useCallback(async () => {
    if (auth.token) {
      dispatch(nodeRequesting({}));
      const result = await getNodes(auth.token);
      dispatch(result);
    }
  }, [auth.token, dispatch]);

  useEffect(() => {
    if (isAuth) {
      history.push(RouteNames.HOME);
      handleGetAllNodes();
    } else {
      history.push(RouteNames.LOGIN);
    }
  }, [handleGetAllNodes, history, isAuth]);

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
