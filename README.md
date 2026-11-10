# 🎬 CineBela API

## 📌 Sobre o projeto

Este projeto consiste em uma API REST desenvolvida utilizando Node.js, Express e MongoDB. Seu objetivo é realizar o gerenciamento de um catálogo de filmes, permitindo cadastrar, consultar, atualizar e excluir informações armazenadas no banco de dados.

A API utiliza métodos HTTP para realizar as operações de CRUD (Create, Read, Update e Delete).

## 🚀 Tecnologias utilizadas

- **Node.js:** ambiente de execução JavaScript.
- **Express:** framework utilizado para criar o servidor e gerenciar as rotas.
- **MongoDB:** banco de dados não relacional utilizado para armazenar os filmes.
- **MongoDB Driver:** biblioteca responsável pela comunicação entre a aplicação e o banco de dados.
- **Dotenv:** biblioteca utilizada para carregar variáveis de ambiente, como a conexão com o MongoDB.


## ✅ Deploy rodando pelo Render

https://api-cinebela.onrender.com/filmes

## ⚙️ Funcionamento do código

### 1. Importação das bibliotecas

```javascript
require('dotenv').config();

const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
```

Nessa parte, são importadas as bibliotecas necessárias para o funcionamento da aplicação:

- **Express:** permite criar o servidor e configurar as rotas.
- **MongoClient:** estabelece a conexão com o banco de dados MongoDB.
- **ObjectId:** permite trabalhar com os identificadores únicos dos filmes.
- **Dotenv:** carrega as informações armazenadas no arquivo `.env`.

### 2. Criação do servidor

```javascript
const app = express();
app.use(express.json());
```

É criada a aplicação utilizando o Express.

O `express.json()` permite que o servidor receba e interprete informações enviadas no formato JSON.

### 3. Conexão com o banco de dados

```javascript
const client = new MongoClient(process.env.MONGO_URI);
const filmes = client.db('cinema').collection('filmes');
```

Nessa etapa, é configurada a conexão com o MongoDB por meio da variável de ambiente `MONGO_URI`.

O código seleciona o banco de dados chamado `cinema` e a coleção `filmes`, onde as informações serão armazenadas.

### 4. Métodos HTTP (CRUD)

A API possui cinco rotas principais:

**POST - Cadastrar filme**

```javascript
app.post('/filmes', async (req, res) => {
    const novoFilme = await filmes.insertOne(req.body);
    res.status(201).json(novoFilme);
});
```

Recebe os dados de um novo filme no corpo da requisição e utiliza `insertOne()` para cadastrá-lo no banco de dados.

**GET - Listar todos os filmes**

```javascript
app.get('/filmes', async (req, res) => {
    const listaFilmes = await filmes.find().toArray();
    res.json(listaFilmes);
});
```

Utiliza `find()` para buscar todos os filmes cadastrados e `toArray()` para transformar os resultados em uma lista.

**GET - Consultar um filme específico**

```javascript
app.get('/filmes/:id', async (req, res) => {
    const filmeEspecifico = await filmes.findOne({
        _id: new ObjectId(req.params.id)
    });
    res.json(filmeEspecifico);
});
```

Permite consultar um filme específico utilizando seu ID, recebido pela URL.

**PUT - Atualizar filme**

```javascript
app.put('/filmes/:id', async (req, res) => {
    const filmeAtualizado = await filmes.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.json(filmeAtualizado);
});
```

Localiza um filme pelo ID e utiliza `updateOne()` junto com `$set` para atualizar suas informações.

**DELETE - Excluir filme**

```javascript
app.delete('/filmes/:id', async (req, res) => {
    const filmeDeletado = await filmes.deleteOne({
        _id: new ObjectId(req.params.id)
    });
    res.json(filmeDeletado);
});
```

Localiza o filme pelo ID e utiliza `deleteOne()` para removê-lo do banco de dados.

### 5. Conexão e inicialização do servidor

```javascript
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
```

Nessa parte, é realizada a conexão com o MongoDB.

Se a conexão for bem-sucedida, o servidor é iniciado. Caso aconteça algum erro, uma mensagem será exibida no terminal.

A variável `PORT` permite utilizar a porta definida pelo ambiente ou, caso não exista, utilizar a porta 3000. Isso também permite executar a API em plataformas de hospedagem, como o Render.

## ▶️ Como executar o projeto

### 1. Instalar as dependências

No terminal, execute:

```bash
npm install
```

### 2. Configurar a conexão

Crie um arquivo `.env` na pasta principal do projeto e adicione sua conexão:

```env
MONGO_URI=sua_string_de_conexao_mongodb
```

### 3. Executar o servidor

Execute o comando:

```bash
npm start
```

Se a conexão for realizada com sucesso, o terminal exibirá:

```text
CONECTADO AO MONGODB
API RODANDO NA PORTA 3000
```

## 📡 Rotas da API

| Método | Rota | Função |
|---|---|---|
| POST | `/filmes` | Cadastrar filme |
| GET | `/filmes` | Listar filmes |
| GET | `/filmes/:id` | Consultar filme |
| PUT | `/filmes/:id` | Atualizar filme |
| DELETE | `/filmes/:id` | Excluir filme |

## 🗄️ Estrutura do banco de dados

O banco de dados utilizado possui a seguinte organização:

- **Banco de dados:** `cinema`
- **Coleção:** `filmes`
- **Documentos:** informações dos filmes cadastrados.

Cada filme pode possuir informações como título, diretor, ano de lançamento, gênero e nota.

## 🎯 Objetivo

O projeto tem como objetivo colocar em prática os conceitos de desenvolvimento de APIs REST, integração com banco de dados não relacional, utilização de métodos HTTP e operações CRUD utilizando JavaScript.
