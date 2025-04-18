const User = require('../database/models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY must be defined in environment variables');
}

exports.register = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        // Crear nuevo usuario
        const user = await User.create({
            email,
            password,
            username,
            role: "Client",
        });
        res.status(201).json({
            message: 'Usuario registrado exitosamente',
        });
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
};

exports.registerAdmin = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        // Crear nuevo usuario
        const user = await User.create({
            email,
            password,
            username,
            role: "Admin"
        });
        res.status(201).json({
            message: 'Usuario administrador registrado exitosamente',
        });
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );
        const saveToken  = await User.update(
            { token : token },
            { where: { id: user.id } }
        );
        res.json({
            message: 'Login exitoso',
            token,
            saveToken   
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};