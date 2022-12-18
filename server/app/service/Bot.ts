import { Service } from 'egg';
import { FileBox } from 'file-box';

export default class FileService extends Service {
  async logout() {
    const { app } = this;
    await app.bot.logout();
  }

  async scan() {
    const { app } = this;
    const qrcode = app.redis.get('bot').get('qrcode');
    return qrcode;
  }

  async getUserSelf() {
    const { app } = this;
    const user = app.bot.currentUser;
    return user;
  }
  async findAllFriend() {
    const { app } = this;
    let friends = app.redis.get('bot').get('friends');
    if (!friends) {
      friends = await app.bot.Contact.findAll();
      await app.redis.get('bot').set('friends', friends);
    }
    return friends;
  }
  async findAllRoom() {
    const { app } = this;
    let rooms = app.redis.get('bot').get('rooms');
    if (!rooms) {
      rooms = await app.bot.Room.findAll();
      await app.redis.get('bot').set('friends', rooms);
    }
    return rooms;
  }

  async sayToSomeOne(type:'text'|'file', text:string, name:string) {
    const { app } = this;
    const concat = await app.bot.Contact.find({ name }) || await app.bot.Contact.find({ alias: name });
    if (concat) {
      if (type === 'text') {
        concat?.say(text);
      } else {
        const fileBox = FileBox.fromUrl(text);
        concat?.say(fileBox);
      }
    } else {
      throw new Error('未找到当前联系人');
    }
  }

  async sayToRoom(type:'text'|'file', text:string, topic:string) {
    const { app } = this;
    const concat = await app.bot.Room.find({ topic });
    if (concat) {
      if (type === 'text') {
        concat?.say(text);
      } else {
        const fileBox = FileBox.fromUrl(text);
        concat?.say(fileBox);
      }
    } else {
      throw new Error('未找到当前联系人');
    }
  }

}
