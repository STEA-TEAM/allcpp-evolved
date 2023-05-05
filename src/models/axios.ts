export interface EventInfo {
  id: number;
  name: string;
  enterAddress: string;
  enterTime: Date;
  endTime: Date;
  tag: string;
  logoPicUrl: string;
}
export interface EventList {
  list: EventInfo[];
  pages: number;
  size: number;
  total: number;
}

export interface Purchaser {
  id: number;
  name: string;
}

export interface User {
  id: number;
  token: string;
  nickname: string;
  avatar: string;
  description: string;
}
