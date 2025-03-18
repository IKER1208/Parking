const Notification = require('../database/models/Notification');
const ParkingLot = require('../database/models/ParkingLot');

exports.createNotification = async (req, res) => {
    try {
        const { title, message, parking_lot_id } = req.body;
        
        const parkingLot = await ParkingLot.findByPk(parking_lot_id);
        if (!parkingLot) {
            return res.status(404).json({ message: 'Lugar de estacionamiento no encontrado' });
        }

        const notification = await Notification.create({
            title,
            message,
            parking_lot_id
        });

        res.status(201).json({
            message: 'Notificación creada exitosamente',
            notification
        });
    } catch (error) {
        console.error('Error al crear notificación:', error);
        res.status(500).json({ message: 'Error al crear notificación' });
    }
};

exports.getNotificationsByParkingLot = async (req, res) => {
    try {
        const { parking_lot_id } = req.params;
        
        const notifications = await Notification.findAll({
            where: { parking_lot_id },
            include: [{ model: ParkingLot }]
        });

        res.json(notifications);
    } catch (error) {
        console.error('Error al obtener notificaciones:', error);
        res.status(500).json({ message: 'Error al obtener notificaciones' });
    }
};

exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        
        const notification = await Notification.findByPk(id);
        if (!notification) {
            return res.status(404).json({ message: 'Notificación no encontrada' });
        }

        await notification.destroy();
        res.json({ message: 'Notificación eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar notificación:', error);
        res.status(500).json({ message: 'Error al eliminar notificación' });
    }
};
