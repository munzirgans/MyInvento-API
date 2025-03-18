const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/barang', itemRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
