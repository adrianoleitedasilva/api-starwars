const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json())
const port = 3000;

mongoose.connect('mongodb+srv://<user>:<password>@api-starwars.ufn5b5y.mongodb.net/');

const Filme = mongoose.model('Filme', {
    title: String,
    description: String,
    img_url: String,
    trailer_url: String,
});

// Listando as ocorrências do Banco
app.get('/', async (req, res) => {
    const filmes = await Filme.find();
    return res.send(filmes);
});

// Gravando as informações no Banco
app.post('/novoregistro', async (req, res) => {
    const filme = new Filme({
        title: req.body.title,
        description: req.body.description,
        img_url: req.body.img_url,
        trailer_url: req.body.trailer_url
    });

    await filme.save();
    return res.send(filme);
});

// Excluindo um registro
app.delete("/delete/:id", async (req, res) => {
    const filme = await Filme.findByIdAndRemove(req.params.id);
    return res.send(filme);
});

// Atualizando os registros
app.put("/update/:id", async (req, res) => {
    const filme = await Filme.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        img_url: req.body.img_url,
        trailer_url: req.body.trailer_url
    }, {
        new: true
    });

    return res.send(filme);
});

app.listen(port, () => {
    console.log("App está rodando!")
});
