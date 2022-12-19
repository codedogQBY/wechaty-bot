import { Controller } from 'egg';

export default class BotController extends Controller {
  async scan() {
    const { ctx } = this;
    try {
      const code = await ctx.service.bot.scan();
      ctx.helper.response.handleSuccess({ ctx, msg: '获取登录二维码成功', data: code });
    } catch (e) {
      ctx.helper.response.handleError({ ctx, msg: '获取登录二维码失败' });
      console.log(e);
    }
  }

  async logout() {
    const { ctx } = this;
    try {
      await ctx.service.bot.logout();
      ctx.helper.response.handleSuccess({ ctx, msg: '退出登录成功' });
    } catch (e) {
      ctx.helper.response.handleError({ ctx, msg: '退出登录失败' });
      console.log(e);
    }
  }

  async getUserSelf() {
    const { ctx } = this;
    try {
      const botInfo = await ctx.service.bot.getUserSelf();
      ctx.helper.response.handleSuccess({ ctx, msg: '获取机器人信息成功', data: botInfo });
    } catch (e) {
      ctx.helper.response.handleError({ ctx, msg: '获取机器人信息失败' });
      console.log(e);
    }
  }

  async getLogonoff() {
    const { ctx, app } = this;
    try {
      const isLogin = (await app.bot.isLoggedIn) || false;
      ctx.helper.response.handleSuccess({ ctx, msg: '获取机器人登录状态成功', data: isLogin });
    } catch (e) {
      ctx.helper.response.handleError({ ctx, msg: '获取机器人登录状态败' });
      console.log(e);
    }
  }

  async start() {
    const { ctx, app } = this;
    try {
      await app.bot.start();
      ctx.helper.response.handleSuccess({ ctx, msg: '机器人启动成功，请继续登录' });
    } catch (e) {
      ctx.helper.response.handleError({ ctx, msg: '机器人启动失败' });
      console.log(e);
    }
  }

  async stop() {
    const { ctx, app } = this;
    try {
      await app.bot.start();
      ctx.helper.response.handleSuccess({ ctx, msg: '机器人已停止运行' });
    } catch (e) {
      ctx.helper.response.handleError({ ctx, msg: '机器人停止运行失败' });
      console.log(e);
    }
  }

  async getAllFriends() {
    const { ctx } = this;
    try {
      const { pageNum, pageSize } = ctx.request.body;
      // const { name, alias } = params;
      const allFriends = await ctx.service.bot.findAllFriend();
      const list = allFriends?.slice((pageNum - 1) * pageSize, pageNum * pageSize);
      const data = ctx.helper.utils.getPagination(
        list,
        allFriends?.length,
        pageSize,
        pageNum,
      );
      ctx.helper.response.handleSuccess({ ctx, msg: '获取好友列表成功', data });
    } catch (e) {
      ctx.helper.response.handleError({ ctx, msg: '获取好友列表失败' });
      console.log(e);
    }
  }
}
