// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportMaterial from '../../../app/model/material';
import ExportMenu from '../../../app/model/menu';
import ExportRole from '../../../app/model/role';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Material: ReturnType<typeof ExportMaterial>;
    Menu: ReturnType<typeof ExportMenu>;
    Role: ReturnType<typeof ExportRole>;
    User: ReturnType<typeof ExportUser>;
  }
}
