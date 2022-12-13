import { Context } from 'egg';
export interface IParams {
  ctx: Context;
  msg?: string;
  code?: number;
  data?: any;
}
class ResponseHelper {
  handleSuccess({ ctx, msg = '请求成功', data = {}, code = 0 }: IParams) {
    ctx.body = { code, msg, data };
  }

  handleError({ ctx, msg = '请求失败, 请稍后访问', code = -1, data = {} }: IParams) {
    ctx.body = { code, msg, data };
  }

  getPagination<T>(records: Array<T>, total: number, pageSize: number, pageNum: number) {
    return {
      records,
      total,
      pageSize,
      current: pageNum,
      pages: Math.ceil(total / pageSize),
    };
  }
}

export default new ResponseHelper();
