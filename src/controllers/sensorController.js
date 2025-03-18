const Sensor = require('../database/models/Sensor');
const ParkingSensor = require('../database/models/ParkingSensor');
const Log = require('../database/models/Log');

exports.createSensor = async (req, res) => {
    try {
        const { sensor_name, sensor_model } = req.body;
        
        const sensor = await Sensor.create({
            sensor_name,
            sensor_model
        });

        res.status(201).json({
            message: 'Sensor guardado exitosamente',
            sensor
        });
    } catch (error) {
        console.error('Error al guardar sensor:', error);
        res.status(500).json({ message: 'Error al guardar sensor' });
    }
};

exports.assignSensorToParkingLot = async (req, res) => {
    try {
        const { parking_lot_id, sensor_id, status } = req.body;
        
        const parkingSensor = await ParkingSensor.create({
            parking_lot_id,
            sensor_id,
            status
        });

        res.status(201).json({
            message: 'Sensor asignado exitosamente',
            parkingSensor
        });
    } catch (error) {
        console.error('Error al asignar sensor:', error);
        res.status(500).json({ message: 'Error al asignar sensor' });
    }
};

exports.updateSensorStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const parkingSensor = await ParkingSensor.findByPk(id);
        if (!parkingSensor) {
            return res.status(404).json({ message: 'Asignación de sensor no encontrada' });
        }

        await parkingSensor.update({ status });
        
        // Crear log del cambio de estado
        await Log.create({
            sensor_id: parkingSensor.sensor_id,
            log_body: `Sensor status updated to: ${status}`
        });

        res.json({
            message: 'Estado del sensor actualizado exitosamente',
            parkingSensor
        });
    } catch (error) {
        console.error('Error al actualizar estado del sensor:', error);
        res.status(500).json({ message: 'Error al actualizar estado del sensor' });
    }
};

exports.getSensorLogs = async (req, res) => {
    try {
        const { sensor_id } = req.params;
        
        const logs = await Log.findAll({
            where: { sensor_id },
            include: [{ model: Sensor }],
            order: [['created_at', 'DESC']]
        });

        res.json(logs);
    } catch (error) {
        console.error('Error al obtener logs del sensor:', error);
        res.status(500).json({ message: 'Error al obtener logs del sensor' });
    }
};

exports.getAllSensors = async (req, res) => {
    try {
        const sensors = await Sensor.findAll({
            include: [{
                model: ParkingSensor,
                attributes: ['status', 'parking_lot_id']
            }]
        });
        
        res.json(sensors);
    } catch (error) {
        console.error('Error al obtener sensores:', error);
        res.status(500).json({ message: 'Error al obtener sensores' });
    }
};
