import React from 'react';
import { initialState, IState, TNodeDispatch } from '@store/node/reducers';

type TNodeContext = {
  /**
   * node store.
   */
  node: IState;
  /**
   * node store updating dispatch
   */
  dispatch: TNodeDispatch;
};

const NodeContext: React.Context<TNodeContext> = React.createContext({
  node: initialState,
  dispatch: ((data) => data) as TNodeDispatch
});
const NodeProvider = NodeContext.Provider;
/**
 * Consumer for node store contexts providing.
 * @param {TNodeContext['node']} auth Node store.
 * @param {TNodeContext['dispatch']} dispatch Node store updating dispatch.
 */
const NodeConsumer = NodeContext.Consumer;

export { NodeContext, NodeProvider, NodeConsumer };
