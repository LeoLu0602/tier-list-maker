export interface ItemType {
  id: string;
  url: string;
  description: string;
}

export interface TemplateType {
  id: string;
  title: string;
  poster: string;
}

export interface TierListType {
  id: string;
  created_at: string;
  user_id: string;
  s: string[];
  a: string[];
  b: string[];
  c: string[];
  f: string[];
  not_rated: string[];
  template_id: string;
  title: string;
  poster: string;
}

export interface AuthType {
  userId: string;
  avatarUrl: string;
  name: string;
  email: string;
}

export interface ActionType {
  type: string;
  newAuth?: AuthType;
}
