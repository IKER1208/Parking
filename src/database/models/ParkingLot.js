const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./User');

const ParkingLot = sequelize.define('ParkingLot', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: true
});

// Definir relaciones
ParkingLot.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(ParkingLot, { foreignKey: 'user_id' });

module.exports = ParkingLot;
