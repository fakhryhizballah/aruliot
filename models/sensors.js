'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sensors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    
  }
  sensors.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    value1: DataTypes.DOUBLE(8, 2),
    value2: DataTypes.DOUBLE(8, 2),
    value3: DataTypes.DOUBLE(8, 2),
    value4: DataTypes.DOUBLE(8, 2),
    value5: DataTypes.DOUBLE(8, 2),
      created_at: {
          type: DataTypes.DATE
      },
      updated_at: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'sensors',
    tableName: 'sensors',
    timestamps: false,
      created_at: false,
      updated_at: false,
    
    
   
  });
  return sensors;
};