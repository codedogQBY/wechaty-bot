import { WechatyBuilder, Wechaty } from 'wechaty';
export default class AppBootHook {
  constructor(app) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.app = app;
  }
  async willReady() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const app = await this.app;
    const bot:Wechaty = WechatyBuilder.build({
      name: 'puppet-wechat',
      puppet: 'wechaty-puppet-wechat',
      puppetOptions: {
        uos: true, // 开启uos协议
      },
    });
    console.log('机器人初始化成功');
    await bot.start();
    console.log('机器人已启动');
    bot.on('scan', (url, status) => {
      console.log(
        `Scan QR Code to login: ${status}\n${app.config.wechat.loginUrl}${encodeURIComponent(
          url,
        )}`,
      );
      app.redis.get('bot').set('qrcode', `${app.config.wechat.loginUrl}${encodeURIComponent(url)}`);
    });
    bot.on('login', user => { console.log(`user ${user} login`); });
    bot.on('logout', user => { console.log(`user ${user} logout`); });
    bot.on('error', error => { console.error(error); });
    app.bot = bot;
  }
}
