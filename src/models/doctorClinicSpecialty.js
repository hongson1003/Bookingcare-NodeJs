'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class doctorClinicSpecialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    doctorClinicSpecialty.init({
        doctorId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'doctorClinicSpecialty',
    });
    return doctorClinicSpecialty;
};