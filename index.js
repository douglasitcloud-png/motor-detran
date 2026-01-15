const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/consultar', async (req, res) => {
    const { placa, renavam } = req.body;
    console.log(` Tentativa de consulta recebida: Placa ${placa}, Renavam ${renavam}`);

    try {
        // Substitua 'SUA_CHAVE_AQUI' pela chave real da API que você está usando
        const response = await axios.get(`https://api.exemplo.com/v1/veiculo/${placa}/${renavam}`, {
            headers: { 'Authorization': 'Bearer SUA_CHAVE_AQUI' }
        });

        console.log(" Dados encontrados com sucesso!");
        res.json({ vehicle: response.data });

    } catch (error) {
        console.error(" Erro na busca externa:", error.message);
        // Se a API externa falhar, mandamos o aviso para o seu site
        res.status(404).json({ error: "Veículo não localizado na base de dados externa." });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
