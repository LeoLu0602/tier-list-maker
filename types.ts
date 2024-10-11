export interface ItemType {
  id: string;
  url: string;
  description: string;
}

export interface TemplateType {
  id: string;
  created_at: string;
  title: string;
  poster: string;
}

export interface TierListType {
  template_id: string;
  user_id: string;
  s: string[];
  a: string[];
  b: string[];
  c: string[];
  f: string[];
  not_rated: string[];
  title: string;
  poster: string;
}

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
