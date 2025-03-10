const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);


sequelize.sync()
    .then(() => console.log('Base de datos sincronizada'))
    .catch(err => console.error('Error al sincronizar la base de datos:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});