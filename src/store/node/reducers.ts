import { useReducer, Dispatch } from 'react';
import { TNode } from '@utils/interfaces';

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
import { NodeActionTypes } from './actions';

type TNodeDispatch = Dispatch<NodeActionTypes>;

interface IState {
  nodes: TNode[];
  nodesFiltered: TNode[] | null;
  currentNode: TNode | null;
  error: string;
  isLoading: boolean;
}

const initialState: IState = {
  nodes: [],
  nodesFiltered: null,
  currentNode: null,
  error: '',
  isLoading: false
};

const handleActions = (state: IState, action: NodeActionTypes): IState => {
  const reducer = {
    [NODES_ALL_REQUESTING]: {
      ...state,
      isLoading: true
    },
    [NODES_ALL_SUCCESS]: {
      ...state,
      nodes: action.payload,
      error: '',
      isLoading: false
    },
    [NODES_ALL_ERROR]: {
      ...state,
      error: action.payload.error?.response?.statusText,
      isLoading: false
    },
    [NODE_REQUESTING]: {
      ...state,
      isLoading: true
    },
    [NODE_SUCCESS]: {
      ...state,
      currentNode: action.payload,
      isLoading: false
    },
    [NODE_ERROR]: {
      ...state,
      error: action.payload.error?.response?.statusText,
      isLoading: false
    },
    [NODE_POST_REQUESTING]: {
      ...state,
      isLoading: true
    },
    [NODE_POST_SUCCESS]: {
      ...state,
      nodes: [...state.nodes, action.payload],
      isLoading: false
    },
    [NODE_POST_ERROR]: {
      ...state,
      error: action.payload.error?.response?.statusText,
      isLoading: false
    },
    [NODE_EDIT_REQUESTING]: {
      ...state,
      isLoading: true
    },
    [NODE_EDIT_SUCCESS]: {
      ...state,
      nodes: state.nodes.map((node) => (node.id === action.payload.id ? { ...node, ...action.payload } : node)),
      isLoading: false
    },
    [NODE_EDIT_ERROR]: {
      ...state,
      error: action.payload.error?.response?.statusText,
      isLoading: false
    },
    [NODE_REMOVE_REQUESTING]: {
      ...state,
      isLoading: true
    },
    [NODE_REMOVE_SUCCESS]: {
      ...state,
      nodes: state.nodes.filter((node) => node.id !== action.payload),
      isLoading: false
    },
    [NODE_REMOVE_ERROR]: {
      ...state,
      error: action.payload.error,
      isLoading: false
    }
  };

  return reducer[action.type] || state;
};

const useNodeReducer = (): [IState, TNodeDispatch] => useReducer(handleActions, initialState);

export { useNodeReducer, initialState };
export type { IState, TNodeDispatch };
