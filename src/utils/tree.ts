import { TNode } from '@utils/interfaces';
import { GridRowsProp } from '@mui/x-data-grid-pro';

interface ITreeNode {
  id: number;
  name: string;
  parentId?: number | null;
  children: ITreeNode[];
}
/**
 * Create a node tree array.
 * @param data node array without node tree
 * @returns {ITreeNode[]}
 * @example
 * const data = [
  { id: 1, name: "Parent 1", parentId: null },
  { id: 2, name: "Parent 2", parentId: null },
  { id: 3, name: "Child 1", parentId: 1 },
  { id: 4, name: "Child 2", parentId: 1 },
  { id: 5, name: "Grandchild 1", parentId: 3 },
  { id: 6, name: "Grandchild 2", parentId: 3 },
];
const treeFromData = [
  {
    id: 1,
    name: "Parent 1",
    parentId: null,
    children: [
      {
        id: 3,
        name: "Child 1",
        parentId: 1,
        children: [
          { id: 5, name: "Grandchild 1", parentId: 3, children: [] },
          { id: 6, name: "Grandchild 2", parentId: 3, children: [] },
        ],
      },
      { id: 4, name: "Child 2", parentId: 1, children: [] },
    ],
  },
  {
    id: 2,
    name: "Parent 2",
    parentId: null,
    children: [],
  },
];
 */
const buildTree = (data: TNode[]): ITreeNode[] => {
  const tree = {} as ITreeNode;

  data.forEach((item) => {
    const { id, parentId } = item;

    if (!tree[id]) {
      tree[id] = { children: [] };
    }

    tree[id] = { ...item, children: tree[id].children };

    if (parentId === null || parentId === undefined) {
      tree[id].parentId = null;
    } else {
      if (!tree[parentId]) {
        tree[parentId] = { children: [] };
      }

      tree[parentId].children.push(tree[id]);
    }
  });

  return Object.values(tree).filter((item) => item.parentId === null);
};
/**
 * Pure add newChild to the tree.
 * @param tree node tree array.
 * @param parentId id to closest parent.
 * @param newChild new tree node
 * @returns {ITreeNode[]} new node tree
 */
const addChildToTree = (tree: ITreeNode[], parentId: number, newChild: ITreeNode): ITreeNode[] => {
  return tree.map((node) => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [...node.children, newChild]
      };
    } else if (node.children && node.children.length > 0) {
      return {
        ...node,
        children: addChildToTree(node.children, parentId, newChild)
      };
    }
    return node;
  });
};
/**
 * Generate Grid Rows for mui tree table.
 * @param tree generated from buildTree
 * @returns {GridRowsProp} gridRowsProp (mui rows)
 * @example
 * 
 const tree = [
  {
    id: 5,
    name: 'Test String',
    parentId: null,
    children: [
      { id: 8, name: 'string', parentId: 5, children: [] },
      { id: 9, name: 'string', parentId: 5, children: [] }
    ]
  },
  { id: 7, name: 'strin', parentId: null, children: [] }
];

const result = [
  { hierarchy: [5], name: 'Test String', id: 5 },
  { hierarchy: [5, 8], name: 'string', id: 8 },
  { hierarchy: [5, 9], name: 'string', id: 9 },
  { hierarchy: [7], name: 'strin', id: 7 }
];
 *
 */
const convertToMuiGridRows = (tree: ITreeNode[]): GridRowsProp => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows: any = [];

  const traverseTree = (node: ITreeNode, hierarchy: number[] = []) => {
    const { id, name, children } = node;

    rows.push({
      hierarchy: [...hierarchy, id],
      name,
      id
    });

    if (children) {
      children.forEach((child) => traverseTree(child, [...hierarchy, id]));
    }
  };

  tree.forEach((node) => traverseTree(node));

  return rows;
};

export { buildTree, addChildToTree, convertToMuiGridRows }; // helpers
export type { ITreeNode }; // types
