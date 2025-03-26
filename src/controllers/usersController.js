const User = require('../database/models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error en obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
        return;
    }
}

exports.getUserById = async (req, res) => {
    const {user_id} = req.body;
    try {
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        console.error('Error en obtener usuario:', error);
        res.status(500).json({ message: 'Error al obtener usuario' });
    }
}