import { defineStore } from 'pinia';
import { generatorDynamicRouter } from '@/router/modules/generatorRouters';

export const defineRouterStore = defineStore('asyncRouter', {
  state: () => ({
    addRouters: [] as Common.Router[],
  }),
  actions: {
    generateRoutes() {
      return new Promise((resolve) => {
        generatorDynamicRouter().then((routers) => {
          console.log(routers)
          this.addRouters = routers;
          resolve(undefined);
        });
      });
    },
  },
});
