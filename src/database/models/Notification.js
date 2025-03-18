const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const ParkingLot = require('./ParkingLot');

const Notification = sequelize.define('Notification', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    message: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    parking_lot_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ParkingLot,
            key: 'id'
        }
    }
}, {
    timestamps: true
});

// Definir relaciones
Notification.belongsTo(ParkingLot, { foreignKey: 'parking_lot_id' });
ParkingLot.hasMany(Notification, { foreignKey: 'parking_lot_id' });

module.exports = Notification;
