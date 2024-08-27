export interface AuthType {
  userId: string;
  email: string;
  avatarUrl: string;
}

export interface ActionType {
  type: string;
  newAuth?: AuthType;
}
