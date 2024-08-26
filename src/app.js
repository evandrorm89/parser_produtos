const express = require('express');
const connectDB = require('./config/database');
const routes = require('./routes');
require('./config/cron');

const app = express();

// conectar ao mongoDB
connectDB();

// middlewares
app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
