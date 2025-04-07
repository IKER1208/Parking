const Sensor = require('../database/models/Sensor'); 
const ParkingSensor = require('../database/models/ParkingSensor');
const Log = require('../database/models/Log');

exports.getHistoryData = async (req, res) => {
    try {
        const { sensor_name } = req.params;

        const sensor = await Sensor.findAll({
            where: {
                sensor_name: sensor_name
            }
        });

        const logs = await Log.findAll({
            where: {
                sensor_id: sensor.map(s => s.id)
            }
        });

        res.json({
            message: 'Historial de datos',
            logs
        });
    } catch (error) {
        console.error('Error al obtener el historial de datos:', error);
        res.status(500).json({ message: 'Error al obtener el historial de datos', error });
    }
};

exports.getAllHistoryData = async (req, res) => {
    try {
        const logs = await Log.findAll();

        res.json({
            message: 'Historial de datos',
            logs
        });
    } catch (error) {
        console.error('Error al obtener el historial de datos:', error);
        res.status(500).json({ message: 'Error al obtener el historial de datos', error });
    }
};