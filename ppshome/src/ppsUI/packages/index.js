
const components = require.context('../component/',false,/\.vue$/);

const install = (Vue) => {
  components.keys().forEach(key => {
    const component = components(key).default
    Vue.component(component.name,component)
  });
};

export default {
    install
}