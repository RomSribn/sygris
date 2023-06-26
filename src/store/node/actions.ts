import { httpClientAuthorized } from '@services/httpService';
import { TNode } from '@utils/interfaces';

import { createAction } from '../utils';
import {
  NODES_ALL_REQUESTING,
  NODES_ALL_SUCCESS,
  NODES_ALL_ERROR,
  NODE_REQUESTING,
  NODE_SUCCESS,
  NODE_ERROR,
  NODE_POST_REQUESTING,
  NODE_POST_SUCCESS,
  NODE_POST_ERROR,
  NODE_EDIT_REQUESTING,
  NODE_EDIT_SUCCESS,
  NODE_EDIT_ERROR,
  NODE_REMOVE_REQUESTING,
  NODE_REMOVE_SUCCESS,
  NODE_REMOVE_ERROR
} from './action_types';

export const nodesAllRequesting = createAction(NODES_ALL_REQUESTING);
export const nodesAllSuccess = createAction(NODES_ALL_SUCCESS);
export const nodesAllError = createAction(NODES_ALL_ERROR);

export const nodeRequesting = createAction(NODE_REQUESTING);
export const nodeSuccess = createAction(NODE_SUCCESS);
export const nodeError = createAction(NODE_ERROR);

export const nodePostRequesting = createAction(NODE_POST_REQUESTING);
export const nodePostSuccess = createAction(NODE_POST_SUCCESS);
export const nodePostError = createAction(NODE_POST_ERROR);

export const nodeEditRequesting = createAction(NODE_EDIT_REQUESTING);
export const nodeEditSuccess = createAction(NODE_EDIT_SUCCESS);
export const nodeEditError = createAction(NODE_EDIT_ERROR);

export const nodeRemoveRequesting = createAction(NODE_REMOVE_REQUESTING);
export const nodeRemoveSuccess = createAction(NODE_REMOVE_SUCCESS);
export const nodeRemoveError = createAction(NODE_REMOVE_ERROR);

export const getNodes = async (token: string) => {
  try {
    const nodes = await httpClientAuthorized(token).get('/node');
    return nodesAllSuccess(nodes.data);
  } catch (error) {
    return nodesAllError({ error });
  }
};

export const getNode = async (id: number, token: string) => {
  try {
    const nodes = await httpClientAuthorized(token).get(`/node/${id}`);
    return nodeSuccess(nodes.data);
  } catch (error) {
    return nodeError({ error });
  }
};

export const addNode = async (node: TNode, token: string) => {
  try {
    const nodes = await httpClientAuthorized(token).post('/node', node);
    return nodePostSuccess(nodes.data);
  } catch (error) {
    return nodePostError({ error });
  }
};

export const removeNode = async (id: number, token: string) => {
  try {
    const nodes = await httpClientAuthorized(token).delete(`/node/${id}`);
    return nodeRemoveSuccess(nodes.data);
  } catch (error) {
    return nodeRemoveError({ error });
  }
};

export const editNode = async (node: TNode, token: string) => {
  try {
    const nodes = await httpClientAuthorized(token).patch(`/node/${node.id}`, node);
    return nodeEditSuccess(nodes.data);
  } catch (error) {
    return nodeEditError({ error });
  }
};

export type NodeActionTypes = ReturnType<
  | typeof nodesAllRequesting
  | typeof nodesAllSuccess
  | typeof nodesAllError
  | typeof nodeRequesting
  | typeof nodeSuccess
  | typeof nodeError
  | typeof nodePostRequesting
  | typeof nodePostSuccess
  | typeof nodePostError
  | typeof nodeEditRequesting
  | typeof nodeEditSuccess
  | typeof nodeEditError
  | typeof nodeRemoveRequesting
  | typeof nodeRemoveSuccess
  | typeof nodeRemoveError
>;
