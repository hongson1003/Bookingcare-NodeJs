'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Schedule.belongsTo(models.Allcode, { foreignKey: 'timeType', as: 'timeTypeData', targetKey: 'keyMap' },);
            Schedule.belongsTo(models.User, { foreignKey: 'doctorId', as: 'doctorSchedule', targetKey: 'id' },);

        }
    };
    Schedule.init({
        currentNumber: DataTypes.INTEGER,
        maxNumber: DataTypes.INTEGER,
        date: DataTypes.DATE,
        timeType: DataTypes.STRING,
        doctorId: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'Schedule',
    });
    return Schedule;
};