    // const Sensor = require('../database/models/Sensor');
    // const ParkingSensor = require('../database/models/ParkingSensor');
    // const Log = require('../database/models/Log');
    // const { Buffer } = require('buffer');
    // const { MQTT_API_URL, MQTT_API_KEY, MQTT_SECRET_KEY } = process.env;


    // exports.assignSensorToParkingLot = async (req, res) => {
    //     try {
    //         const { parking_lot_id, sensor_id, status } = req.body;
            
    //         const parkingSensor = await ParkingSensor.create({
    //             parking_lot_id,
    //             sensor_id,
    //             status
    //         });

    //         res.status(201).json({
    //             message: 'Sensor asignado exitosamente',
    //             parkingSensor
    //         });
    //     } catch (error) {
    //         console.error('Error al asignar sensor:', error);
    //         res.status(500).json({ message: 'Error al asignar sensor' });
    //     }
    // };

    // exports.sendTopicMessage = async (req, res) => {
    //     try {
    //         const { datos } = req.body;
            
    //         const response = await fetch(`${MQTT_API_URL}publish/`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Basic ${Buffer.from(`${MQTT_API_KEY}:${MQTT_SECRET_KEY}`).toString('base64')}`,
    //             },
    //             body: JSON.stringify({
    //                 "payload_encoding": "plain",
    //                 "topic": `${datos.topic}`,
    //                 "qos": 0,
    //                 "payload": `${datos.message}`,
    //                 "properties": {
    //                     "payload_format_indicator": 0,
    //                     "message_expiry_interval": 0,
    //                     "response_topic": "some_other_topic",
    //                     "correlation_data": "string",
    //                     "user_properties": {
    //                         "foo": "bar"
    //                     },
    //                     "content_type": "text/plain"
    //                 },
    //                 "retain": true
    //             })
    //         });

    //         if (!response.ok) {
    //             return res.status(404).json({ message: 'No se encontraron logs del sensor'});
    //         }
            
    //         const data = await response.json();

    //         return res.json({
    //             message: 'Message del sensor actualizado exitosamente'
    //         });

    //     } catch (error) {
    //         console.error('Error al actualizar estado del sensor:', error);
    //         return res.status(500).json({ message: 'Error al actualizar estado del sensor', error: error.message });
    //     }
    // };

    // exports.getTopicLogs = async (req, res) => {
    //     try {
    //         const { topic } = req.params;
            
    //         const response = await fetch(`${MQTT_API_URL}mqtt/retainer/message/${topic}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Basic ${Buffer.from(`${MQTT_API_KEY}:${MQTT_SECRET_KEY}`).toString('base64')}`,
    //             }
    //         });

    //         if (!response.ok) {
    //             res.status(404).json({ message: 'No se encontraron logs del sensor' });
    //             return;
    //         }

    //         const data = await response.json();
            
    //         let buff = Buffer.from(data.payload, 'base64');
    //         let text = buff.toString('utf-8');
    //         console.log(text)
    //         res.json({
    //             message: 'Logs del sensor',
    //             text
    //         });

    //     } catch (error) {
    //         console.error('Error al obtener logs del sensor:', error);
    //         res.status(500).json({ message: 'Error al obtener logs del sensor', error });
    //     }
    // };

    // exports.getAllTopicsLogs = async (req, res) => {
    //     try {
    //         const topics = [
    //             'prueba',
    //             'ultrasonico',
    //             'pene'
    //         ];

    //         const fetchTopicLogs = async (topic) => {
    //             const response = await fetch(`${MQTT_API_URL}mqtt/retainer/message/${topic}`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Basic ${Buffer.from(`${MQTT_API_KEY}:${MQTT_SECRET_KEY}`).toString('base64')}`,
    //                 }
    //             });

    //             if (!response.ok) {
    //                 return { topic, error: 'No se encontraron logs del sensor' };
    //             }

    //             const data = await response.json();
    //             let buff = Buffer.from(data.payload, 'base64');
    //             let text = buff.toString('utf-8');

    //             return { topic, text };
    //         };

    //         const results = await Promise.all(topics.map(fetchTopicLogs));

    //         res.json({
    //             message: 'Logs de los sensores',
    //             results
    //         });

    //     } catch (error) {
    //         console.error('Error al obtener logs de los sensores:', error);
    //         res.status(500).json({ message: 'Error al obtener logs de los sensores', error });
    //     }
    // };

    // exports.getParkingLotsLogs = async (req, res) => {
    //     try {
    //         const topics = [
    //             'lugar1',
    //             'lugar2',
    //             'lugar3'
    //         ];

    //         const fetchTopicLogs = async (topic) => {
    //             const response = await fetch(`${MQTT_API_URL}mqtt/retainer/message/${topic}`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Basic ${Buffer.from(`${MQTT_API_KEY}:${MQTT_SECRET_KEY}`).toString('base64')}`,
    //                 }
    //             });

    //             if (!response.ok) {
    //                 return { topic, error: 'No se encontraron logs del sensor' };
    //             }

    //             const data = await response.json();
    //             let buff = Buffer.from(data.payload, 'base64');
    //             let text = buff.toString('utf-8');

    //             return { topic, text };
    //         };

    //         const results = await Promise.all(topics.map(fetchTopicLogs));

    //         res.json({
    //             message: 'Logs de los sensores',
    //             results
    //         });

    //     } catch (error) {
    //         console.error('Error al obtener logs de los sensores:', error);
    //         res.status(500).json({ message: 'Error al obtener logs de los sensores', error });
    //     }
    // };
    const Sensor = require('../database/models/Sensor');
    const ParkingSensor = require('../database/models/ParkingSensor');
    const Log = require('../database/models/Log');
    const { Buffer } = require('buffer');
    const { MQTT_API_URL, MQTT_API_KEY, MQTT_SECRET_KEY } = process.env;
    
    exports.assignSensorToParkingLot = async (req, res) => {
        try {
            const { parking_lot_id, sensor_id, status } = req.body;
            
            const parkingSensor = await ParkingSensor.create({
                parking_lot_id,
                sensor_id,
                status
            });
    
            res.status(201).json({ message: 'Sensor asignado exitosamente', parkingSensor });
        } catch (error) {
            console.error('Error al asignar sensor:', error);
            res.status(500).json({ message: 'Error al asignar sensor' });
        }
    };
    
    exports.sendTopicMessage = async (req, res) => {
        try {
            const { datos } = req.body;
            
            const response = await fetch(`${MQTT_API_URL}publish/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${Buffer.from(`${MQTT_API_KEY}:${MQTT_SECRET_KEY}`).toString('base64')}`,
                },
                body: JSON.stringify({
                    "payload_encoding": "plain",
                    "topic": datos.topic,
                    "qos": 0,
                    "payload": datos.message,
                    "retain": true
                })
            });
    
            if (!response.ok) {
                return res.status(404).json({ message: 'No se pudieron enviar los datos' });
            }
            
            res.json({ message: 'Mensaje enviado exitosamente' });
    
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
            res.status(500).json({ message: 'Error al enviar mensaje', error: error.message });
        }
    };
    
    const saveLog = async (topic, text) => {
        try {
            const sensor = await Sensor.findOne({ where: { sensor_name: topic } });
            if (!sensor) return { topic, error: 'Sensor no registrado en la base de datos' };
            const logEntry = await Log.create({ sensor_id: sensor.id, log_body: text });
            return { topic, logEntry };
        } catch (error) {
            console.error('Error al guardar log:', error);
            return { topic, error: 'Error al guardar log en la base de datos' };
        }
    };
    
    const fetchTopicLogs = async (topic) => {
        try {
            const response = await fetch(`${MQTT_API_URL}mqtt/retainer/message/${topic}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${Buffer.from(`${MQTT_API_KEY}:${MQTT_SECRET_KEY}`).toString('base64')}`,
                }
            });
            if (!response.ok) return { topic, error: 'No se encontraron logs' };
            
            const data = await response.json();
            let text = Buffer.from(data.payload, 'base64').toString('utf-8');
            return await saveLog(topic, text);
        } catch (error) {
            console.error(`Error al obtener logs de ${topic}:`, error);
            return { topic, error: 'Error al obtener logs del sensor' };
        }
    };
    
    exports.getTopicLogs = async (req, res) => {
        try {
            const { topic } = req.params;
            const result = await fetchTopicLogs(topic);
            res.json({ message: 'Log del sensor procesado', result });
        } catch (error) {
            console.error('Error al procesar logs:', error);
            res.status(500).json({ message: 'Error al procesar logs', error });
        }
    };
    
    exports.getAllTopicsLogs = async (req, res) => {
        try {
            const topics = [
                'lugar1', 'lugar2', 'lugar3', 'temperatura', 'humedad', 'mq2',
                'sensor_agua', 'sensor_luz', 'presencia1', 'presencia2', 'presencia3'
            ];
    
            const results = await Promise.all(topics.map(fetchTopicLogs));
            res.json({ message: 'Logs procesados y guardados en la base de datos', results });
        } catch (error) {
            console.error('Error al obtener logs:', error);
            res.status(500).json({ message: 'Error al obtener logs', error });
        }
    };
    
    exports.getParkingLotsLogs = async (req, res) => {
        try {
            const topics = ['lugar1', 'lugar2', 'lugar3'];
            const results = await Promise.all(topics.map(fetchTopicLogs));
            res.json({ message: 'Logs de estacionamientos procesados y guardados en la base de datos', results });
        } catch (error) {
            console.error('Error al obtener logs de estacionamientos:', error);
            res.status(500).json({ message: 'Error al obtener logs de estacionamientos', error });
        }
    };
    