const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
    origin : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials : true,
}));

app.use(express.json());

app.listen(3000, () => console.log('Server is running on port 3000'));