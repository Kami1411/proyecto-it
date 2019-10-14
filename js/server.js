const express = require("express");
const path = require("path");
const fs = require('fs');
const exphbs = require('express-handlebars');

const app = express();
app.use(express.static(path.join(__dirname, 'client')));

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layout')
}));
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'));

app.get("/Mangas", (req, res) => {
    res.render('home');
});

app.get("/Mangas", (req, res) => {

    fs.readFile(path.join(__dirname, "Mangas.JSON"), (err, data) => {
        if (!err) {
            let Mangas = JSON.parse(data);

            if (req.query.Mangas) {
                Mangas = Mangas.filtro(Mangas => Mangas.Manga == req.query.Manga);
            }

            if (req.query.Mangaka) {
                Mangas = Mangas.filtro(Mangas => Mangas.Mangaka == req.query.Mangaka);
            }

            res.render('Mangas', {
                listaDatos: Mangas
            });
        }
    });
   
});
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); //segun tipo de info que viene en el form, puede ser que nos genere problemas sin extended true. Es un objeto nuevo.

app.post("/Mangas", (req, res) => {
    fs.readFile(path.join(__dirname, "Mangas.json"), (err, data) => {
        if (!err) {
            let Mangas = JSON.parse(data);
            console.dir(req.body); //confirmo el body de la request
            if (req.body.nombre) {
                Mangas = Mangas.filter(mangas => mangas.Manga == req.body.Manga);
            }

            if (req.body.codigo) {
                Mangas = Mangas.filter(mangas => mangas.Mangaka == req.body.Mangaka);
            }
            console.dir(Mangas); //confirmo se filtro correctamente
            res.render('Mangas', {
                listaDatos: Mangas,
                tipoMetodo: req.method ////Es para mostrar dinamicamente que tipo de metodo se usó en el H2 de la view mangases.
            });
        }
    });
});

app.listen(3000, () => {
    console.log("Corriendo en puerto 3000 http://localhost:3000/");
});