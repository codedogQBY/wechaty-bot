// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBot from '../../../app/controller/bot';
import ExportFile from '../../../app/controller/file';
import ExportHome from '../../../app/controller/home';
import ExportMaterial from '../../../app/controller/material';
import ExportMenu from '../../../app/controller/menu';
import ExportRole from '../../../app/controller/role';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    bot: ExportBot;
    file: ExportFile;
    home: ExportHome;
    material: ExportMaterial;
    menu: ExportMenu;
    role: ExportRole;
    user: ExportUser;
  }
}
