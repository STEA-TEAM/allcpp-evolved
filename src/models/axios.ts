export interface EventInfo {
  id: number;
  name: string;
  enterAddress: string;
  enterTime: number;
  endTime: number;
  tag: string;
  doujinshiNum: number;
  clubNum: number;
  logoPicUrl: string;
  typeId: number;
  type: string;
}

export interface Event {
  id: number;
  name: string;
  enterAddress: string;
  enterTime: Date;
  endTime: Date;
  tag: string[];
  doujinshiNum: number;
  clubNum: number;
  logoPicUrl: string;
  typeId: number;
  type: string;
}

export interface EventList {
  list: Event[];
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
