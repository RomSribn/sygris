type TTheme = 'light' | 'dark';

interface IUser {
  email: string;
  password: string;
}

type TNode = {
  id: number;
  name: string;
  parentId?: number | null;
};

export type { TTheme, TNode }; // Types
export type { IUser }; // Interfaces
