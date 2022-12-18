import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, middleware } = app;
  const verifyToken = middleware.verifyToken(app.config.jwt);

  // 权限相关
  router.get('/heart', controller.home.index);
  router.post('/api/v1/system/auth/register', controller.user.register);
  router.post('/api/v1/system/auth/sendCodeEmail', controller.user.sendCodeEmail);
  router.post('/api/v1/system/auth/login', controller.user.login);
  router.get('/api/v1/system/auth/logout', controller.user.logout);
  router.get('/api/v1/system/common/code', controller.user.getCode);

  // 用户相关
  router.get('/api/v1/system/user/getUserInfo', verifyToken, controller.user.getUserInfo);
  router.post('/api/v1/system/user/edit', verifyToken, controller.user.editUser);
  router.post('/api/v1/system/user/editInfo', verifyToken, controller.user.editUserInfo);
  router.post('/api/v1/system/user/getUserMenu', verifyToken, controller.user.getUserMenu);
  router.post('/api/v1/system/user/list', verifyToken, controller.user.getUserList);
  router.get('/api/v1/system/user/query', verifyToken, controller.user.query);
  router.post('/api/v1/system/user/add', verifyToken, controller.user.addUser);
  router.post('/api/v1/system/user/editPassword/email', verifyToken, controller.user.editPasswordEmail);
  router.post('/api/v1/system/user/editPassword', verifyToken, controller.user.editPassword);
  router.get('/api/v1/system/user/deleteUserByIds', verifyToken, controller.user.deleteUserByIds);


  // 角色相关
  router.post('/api/v1/system/role/add', verifyToken, controller.role.add);
  router.get('/api/v1/system/role/delete', verifyToken, controller.role.delete);
  router.post('/api/v1/system/role/edit', verifyToken, controller.role.edit);
  router.post('/api/v1/system/role/editPermission', verifyToken, controller.role.editPermission);
  router.get('/api/v1/system/role/getRoleMap', verifyToken, controller.role.getRoleMap);
  router.post('/api/v1/system/role/list', verifyToken, controller.role.list);

  // 菜单相关
  router.post('/api/v1/system/menu/add', verifyToken, controller.menu.add);
  router.get('/api/v1/system/menu/delete', verifyToken, controller.menu.delete);
  router.post('/api/v1/system/menu/edit', verifyToken, controller.menu.edit);
  router.get('/api/v1/system/menu/getMenuMap', verifyToken, controller.menu.getMenuMap);
  router.post('/api/v1/system/menu/list', verifyToken, controller.menu.list);

  // 上传文件
  router.post('/api/v1/system/common/upload/img', verifyToken, controller.file.uploadImg);
  router.post('/api/v1/system/common/upload/file', verifyToken, controller.file.uploadFile);

  // 素材管理
  router.post('/api/v1/material/add', verifyToken, controller.material.add);
  router.get('/api/v1/material/delete', verifyToken, controller.material.delete);
  router.post('/api/v1/material/edit', verifyToken, controller.material.edit);
  router.post('/api/v1/material/list', verifyToken, controller.material.list);

  // 机器人启动相关
  router.get('/api/v1/bot/scan', controller.bot.scan);
  router.get('/api/v1/bot/logout', controller.bot.logout);
  router.get('/api/v1/bot/getUserSelf', controller.bot.getUserSelf);
  router.get('/api/v1/bot/getLogonoff', controller.bot.getLogonoff);
  // 好友管理 好友列表 好友搜索（昵称、备注）发消息 同步好友列表 每日说图片（先定着，不一定实现）

  // 群管理 群列表 群搜索 发消息 群列表同步 关键词入群 群资讯 群定时任务 群合影（先定着，不一定实现）


  // 撤回消息管理 列表 删除

};
