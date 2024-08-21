const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

// Configura body-parser
app.use(bodyParser.json());

// Reemplaza 'your-api-key' con tu clave de API real
const API_KEY = 'your-api-key';
const API_URL = 'https://api.openai.com/v1/completions';

app.post('/message', async (req, res) => {
    try {
        const response = await axios.post(API_URL, {
            model: "text-davinci-003",
            prompt: req.body.message,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json({ reply: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al procesar el mensaje');
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
const cors = require('cors');
app.use(cors());
