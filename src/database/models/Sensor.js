const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Sensor = sequelize.define('Sensor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sensor_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    sensor_model: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Sensor;
