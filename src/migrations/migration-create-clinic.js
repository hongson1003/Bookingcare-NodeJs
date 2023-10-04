'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('clinics', {
            // address: DataTypes.STRING,
            // description: DataTypes.STRING,
            // image: DataTypes.STRING,
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            descriptionHTML: {
                type: Sequelize.TEXT('long')
            },
            descriptionText: {
                type: Sequelize.TEXT('long')
            },
            descriptionTitleHTML: {
                type: Sequelize.TEXT('long')
            },
            descriptionTitleText: {
                type: Sequelize.TEXT('long')
            },
            image: {
                type: Sequelize.BLOB('long')
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('clinics');
    }
};