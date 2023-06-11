export type User = {
  username: string;
};

export type UserContextType = {
  user: User;
  setUser: (user: User | null) => void;
};

export type TodoType = {
  id: string;
  Todo: string;
};
