const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json())
const port = 3000;

mongoose.connect('mongodb+srv://adrianoleitedasilva:o114IVSW0rBTJJU5@api-starwars.ufn5b5y.mongodb.net/');

const Filme = mongoose.model('Filme', {
    title: String,
    description: String,
    img_url: String,
    trailer_url: String,
});

app.get('/', (req, res) => {
    const filmes = Filme.find();
    res.send(filmes);
});

app.post('/novoregistro', async (req, res) => {
    const filme = new Filme({
        title: req.body.title,
        description: req.body.description,
        img_url: req.body.img_url,
        trailer_url: req.body.trailer_url
    });

    await filme.save();
    res.send(filme);
});

app.listen(port, () => {
    console.log("App está rodando!")
});