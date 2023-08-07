// Create Web Server
// npm install express --save
// nodemon app.js
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser');
// npm install body-parser --save
app.use(bodyParser.urlencoded({ extended: false }));

app.locals.pretty = true;

app.set('views', './views_file');
app.set('view engine', 'pug');

app.get('/topic/new', (req, res) => {
    fs.readdir('data', (err, files) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new', { topics: files });
    });
});

app.get(['/topic', '/topic/:id'], (req, res) => {
    const id = req.params.id;
    fs.readdir('data', (err, files) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        if (id) {
            fs.readFile(`data/${id}`, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', { title: id, topics: files, description: data });
            });
        } else {
            res.render('view', { topics: files, title: 'Welcome', description: 'Hello, JavaScript for server.' });
        }
    });
});

app.post('/topic', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    fs.writeFile(`data/${title}`, description, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.redirect(`/topic/${title}`);
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});