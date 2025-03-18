const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const ParkingLot = require('./ParkingLot');
const Sensor = require('./Sensor');

const ParkingSensor = sequelize.define('ParkingSensor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    parking_lot_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ParkingLot,
            key: 'id'
        }
    },
    sensor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Sensor,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Definir relaciones
ParkingSensor.belongsTo(ParkingLot, { foreignKey: 'parking_lot_id' });
ParkingSensor.belongsTo(Sensor, { foreignKey: 'sensor_id' });
ParkingLot.hasMany(ParkingSensor, { foreignKey: 'parking_lot_id' });
Sensor.hasMany(ParkingSensor, { foreignKey: 'sensor_id' });

module.exports = ParkingSensor;
