const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

//models
const Place = require('./models/place');

//connect to mongodb
mongoose.connect('mongodb://127.0.0.1/bestpoints')
    .then(() => {
        console.log('MONGO CONNECTION OPEN!!!');
    })
    .catch(err => {
        console.log('OH NO MONGO CONNECTION ERROR!!!!');
        console.log(err);
    });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});

// app.get('/seed/place', async (req, res) => {
//     const place = new Place({
//         title: 'Starbucks',
//         price: '$$',
//         description: 'A popular coffeehouse chain known for its specialty coffee drinks and cozy atmosphere.',
//         location: '123 Coffee St, Seattle, WA'
//     });
//     await place.save();
//     res.send(place);
// });

app.listen(3000, () => {
    console.log('Server is running on http://127.0.0.1:3000');
});