import { createApp } from "vue"

import { Quasar } from "quasar"
import quasarIconSet from "quasar/icon-set/svg-eva-icons"
import "@quasar/extras/eva-icons/eva-icons.css"
import "quasar/src/css/index.sass"

import "./base.css"

import DillermNavBar from "./components/DillermNavBar.vue"


export default {
  setup(navbar_id) {
    var props = {
      github_url: "https://quasar.dev/start/vite-plugin"
    }
    const app = createApp(DillermNavBar, props);
    app.use(Quasar, {
      plugins: {},
      iconSet: quasarIconSet,
      config: {
      dark: "auto"
      }
    });
    
    app.mount(navbar_id);
    return app;
  }
}

// const plugin = {
//   install (Vue) {
//     console.log("boom");
//     for (const prop in components) {
//       if (components.hasOwnProperty(prop)) {
//         const component = components[prop];
//         console.log(prop, component)
//         console.log("installing:", component.name);
//         Vue.component(prop, component)
//       }
//     }
//   }
// }

// export default plugin