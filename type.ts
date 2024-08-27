export interface AuthType {
  userId: string;
  email: string;
  name: string;
  avatarUrl: string;
}

export interface ActionType {
  type: string;
  newAuth?: AuthType;
}
