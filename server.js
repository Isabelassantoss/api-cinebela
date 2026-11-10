
// Importando as bibliotecas
require('dotenv').config();

const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

// Criando a conexão com o banco:
const app = express();
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);
const filmes = client.db('cinema').collection('filmes');

// Criando os métodos HTTP:

// Cadastrar filme
app.post('/filmes', async (req, res) => {
    const novoFilme = await filmes.insertOne(req.body);
    res.status(201).json(novoFilme);
});

// Listar filmes
app.get('/filmes', async (req, res) => {
    const listaFilmes = await filmes.find().toArray();
    res.json(listaFilmes);
});

// Buscar filme por ID
app.get('/filmes/:id', async (req, res) => {
    const filmeEspecifico = await filmes.findOne({
        _id: new ObjectId(req.params.id)
    });

    res.json(filmeEspecifico);
});

// Atualizar filme
app.put('/filmes/:id', async (req, res) => {
    const filmeAtualizado = await filmes.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );

    res.json(filmeAtualizado);
});

// Excluir filme
app.delete('/filmes/:id', async (req, res) => {
    const filmeDeletado = await filmes.deleteOne({
        _id: new ObjectId(req.params.id)
    });

    res.json(filmeDeletado);
});

// Conectando ao MongoDB
client.connect()
    .then(() => {
        console.log('CONECTADO AO MONGODB');

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`API RODANDO NA PORTA ${PORT}`);
        });
    })
    .catch((erro) => {
        console.log('ERRO AO CONECTAR', erro.message);
    });