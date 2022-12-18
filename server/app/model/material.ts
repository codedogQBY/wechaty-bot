import { DataTypes } from 'sequelize';

const { INTEGER, DATE, STRING } = DataTypes;

export default app => {
    const Material = app.model.define('material', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name:{type:STRING(1024),allowNull: false ,comment: '素材名称'},
      content:{type:STRING(1024),comment: '素材内容'},
      type:{type:INTEGER,allowNull: false,defaultValue:1 ,comment: '素材类型:1为文字素材；2为文件素材'},
      url:{type:STRING(1024), comment: '文件地址' },
      created_at: DATE,
      updated_at: DATE,
    });
  
    return Material;
  };