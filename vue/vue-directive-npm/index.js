
//  index.html中方法包装在这里到处
let loadingNode = document.createElement('div');
loadingNode.style.backgroundColor = '#eee';
loadingNode.style.opacity = '.6';
loadingNode.style.position = 'absolute';
loadingNode.style.left = 0;
loadingNode.style.top = 0;
loadingNode.style.right = 0;
loadingNode.style.bottom = 0;
function toggleLoading(el, binding) {
  if (binding.value) {
    el.appendChild(loadingNode);
  } else {
    el.contains(loadingNode) && el.removeChild(loadingNode);
  }
}
// 组件
let plugin = {};
// Vue.use() 会将项目中调用vue的功能
plugin.install = function(Vue) {
  // vue的指令在这里拓展
  Vue.directive('loading', {
    bind: function (el, binding) {
      // console.log(el, binding);
      // bind第一次绑定的时候 只会调用一次
      toggleLoading(el, binding);
    },
    update(el, binding) {
      toggleLoading(el, binding);
    }
  })
  // 满足install 且又是对象 满足vue的插件要求
}
// vue 插件 提供全局的方法
// import VueLoading from 'vue-laoding'
// Vue.use(VueLoading);
// 包的导出
// 通用 js的模块化 方案 UMD
if (typeof exports === 'object') {
  module.exports = plugin
} else {
  // window
  window.VueLoading = plugin;
  window.Vue.use(plugin);
}
// npm login
// npm publish