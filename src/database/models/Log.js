const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Sensor = require('./Sensor');

const Log = sequelize.define('Log', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sensor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Sensor,
            key: 'id'
        }
    },
    log_body: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Definir relaciones
Log.belongsTo(Sensor, { foreignKey: 'sensor_id' });
Sensor.hasMany(Log, { foreignKey: 'sensor_id' });

module.exports = Log;
