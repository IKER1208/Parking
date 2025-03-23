const ParkingLot = require('../database/models/ParkingLot');
const User = require('../database/models/User');

exports.createParkingLot = async (req, res) => {
    try {
        const { user_id } = req.body;
        const parkingLot = await ParkingLot.create({
            user_id,
            status: true
        });
        res.status(201).json({
            message: 'Lugar de estacionamiento creado exitosamente',
            parkingLot
        });
    } catch (error) {
        console.error('Error al crear lugar de estacionamiento:', error);
        res.status(500).json({ message: 'Error al crear lugar de estacionamiento' });
    }
};

exports.updateParkingLotStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const parkingLot = await ParkingLot.findByPk(id);
        if (!parkingLot) {
            return res.status(404).json({ message: 'Lugar de estacionamiento no encontrado' });
        }

        await parkingLot.update({ status });
        res.json({
            message: 'Estado actualizado exitosamente',
            parkingLot
        });
    } catch (error) {
        console.error('Error al actualizar estado:', error);
        res.status(500).json({ message: 'Error al actualizar estado' });
    }
};

exports.getAllParkingLots = async (req, res) => {
    try {
        const parkingLots = await ParkingLot.findAll({
            include: [{ model: User, attributes: ['username', 'email'] }]
        });
        res.json(parkingLots);
    } catch (error) {
        console.error('Error al obtener lugares de estacionamiento:', error);
        res.status(500).json({ message: 'Error al obtener lugares de estacionamiento' });
    }
};

exports.getParkingLotById = async (req, res) => {
    try {
        const { id } = req.params;
        const parkingLot = await ParkingLot.findByPk(id, {
            include: [{ model: User, attributes: ['username', 'email'] }]
        });
        
        if (!parkingLot) {
            return res.status(404).json({ message: 'Lugar de estacionamiento no encontrado' });
        }
        
        res.json(parkingLot);
    } catch (error) {
        console.error('Error al obtener lugar de estacionamiento:', error);
        res.status(500).json({ message: 'Error al obtener lugar de estacionamiento' });
    }
};

exprts.getTop4FreeParkingLots = async (req, res) => {
    try {
        const parkingLots = await ParkingLot.findAll({
            where: { status: true },
            order: [['id', 'DESC']],
            limit: 4
        });
        res.json(parkingLots);
    } catch (error) {
        console.error('Error al obtener lugares de estacionamiento:', error);
        res.status(500).json({ message: 'Error al obtener lugares de estacionamiento' });
    }
};