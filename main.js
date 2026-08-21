require('dotenv').config();
const express = require('express');



const app = express();

app.use(express.json())
app.use(express.static('public'));

app.get('/ping', (req, res) => {
    res.json({status: 'ok', message: 'TechPulse rodando!'});
});

const PORT = process.env.PORT||8080;
app.listen(PORT, () => {
    console.log ('Servidor rodando em http://localhost:${PORT}');
});