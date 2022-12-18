import { Controller } from 'egg';
import { Op } from 'sequelize';

export default class MaterialController extends Controller {
  public async list() {
    const ctx = this.ctx;
    try {
      const { type, pageNum, pageSize } = ctx.request.body;
      const total = (await ctx.model.Material.findAll()).length;
      const list = await ctx.model.Material.findAll({
        attributes: [ 'id', 'name', 'content', 'type', 'url', [ 'updated_at', 'updatedAt' ]],
        where: {
          type: +type,
        },
        offset: (Number(pageNum) - 1) * Number(pageSize),
        limit: pageSize,
      });
      const data = ctx.helper.utils.getPagination(
        list.map(item => {
          return ctx.helper.utils.lineToHumpObject(item);
        }),
        total,
        pageSize,
        pageNum,
      );
      ctx.helper.response.handleSuccess({ ctx, msg: '获取素材列表成功', data });
    } catch (error) {
      console.error(error);
      ctx.helper.response.handleError({ ctx, msg: '获取素材列表失败' });
    }
  }

  public async delete() {
    const ctx = this.ctx;
    try {
      const { ids } = ctx.request.query;
      await ctx.model.Material.destroy({
        where: {
          id: {
            [Op.in]: ids.split(','),
          },
        },
      });
      ctx.helper.response.handleSuccess({ ctx, msg: '删除素材成功' });
    } catch (error) {
      console.error(error);
      ctx.helper.response.handleError({ ctx, msg: '删除素材失败' });
    }
  }

  public async add() {
    const ctx = this.ctx;
    try {
      const { name, content, type, url } = ctx.request.body;
      await ctx.model.Material.create({ name, content, type, url });
      ctx.helper.response.handleSuccess({ ctx, msg: '添加角色成功' });
    } catch (error) {
      console.error(error);
      ctx.helper.response.handleError({ ctx, msg: '添加素材失败' });
    }
  }

  public async edit() {
    const ctx = this.ctx;
    try {
      const { id, name, content, type, url } = ctx.request.body;
      await ctx.model.Material.update({
        name, content, type, url,
      }, {
        where: {
          id: +id,
        },
      });
      ctx.helper.response.handleSuccess({ ctx, msg: '更新素材成功' });
    } catch (error) {
      console.error(error);
      ctx.helper.response.handleError({ ctx, msg: '更新素材失败' });
    }
  }
}
