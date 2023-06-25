import { TNode } from '@utils/interfaces';

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

export { buildTree, addChildToTree }; // helpers
export type { ITreeNode }; // types
