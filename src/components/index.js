import components from "./components"

const plugin = {
  install (Vue) {
    console.log("boom");
    for (const prop in components) {
      if (components.hasOwnProperty(prop)) {
        const component = components[prop];
        console.log(prop, component)
        console.log("installing:", component.name);
        Vue.component(prop, component)
      }
    }
  }
}

export default plugin