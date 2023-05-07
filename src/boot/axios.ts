import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { EventInfo, EventList } from 'src/models/axios';

declare module '@vue/runtime-core' {
  // noinspection JSUnusedGlobalSymbols
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const useApi = () => ({
  getEvents: async (index = 1, size = 10): Promise<EventList> => {
    const data = (await api.get('/event', { params: { index, size } })).data;
    data.list = data.list.map((event: EventInfo) => ({
      ...event,
      enterTime: new Date(event.enterTime),
      endTime: new Date(event.endTime),
      tag: event.tag.split('|'),
    }));
    return data;
  },
});

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside the
// "export default () => {}" function below (which runs individually
// for each client)
export default boot(({ app }) => {
  app.provide('axios', axios);
  app.provide('api', api);
});

export { api, useApi };
