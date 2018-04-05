export default (() => {
  window.gconfig = {};
  +(function (global) {
    // 本地开发打开的路径以及端口
    global.linkUrl = 'http://39.106.180.208:8088';
    // global.linkUrl = 'http://localhost:3030';
    if (process.env.NODE_ENV === 'production') { // 生产环境用不同的接口地址
      global.linkUrl = 'http://localhost:3000';
    }
    // 系统一二级菜单
    global.nav = [
      {
        id: 1001,
        name: '模板管理',
        icon: 'book',
        url: '',
        children: [
          {
            id: 1002, name: '创建模板', url: 'template/create', icon: 'user'
          },
          {
            id: 1003, name: '模板列表', url: 'template/list', icon: 'book'
          }
        ]
      }
    ];
  }(window.gconfig));
})()

export const prefix = global.gconfig.linkUrl
export const suffix = ''
export const timeout = 6000
