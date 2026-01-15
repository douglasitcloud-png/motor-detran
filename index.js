const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/consultar', async (req, res) => {
    const { placa, renavam } = req.body;
    try {
        const response = await axios.get(`https://api.v2.zapay.com.br/api/v2/vehicles/debits/?plate=${placa}&renavam=${renavam}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar dados. Verifique placa/renavam." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
