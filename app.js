const express = require('express');
const methodOverride = require('method-override');
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

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});

app.get('/places', async (req, res) => {
    const places = await Place.find({});
    res.render('places/index', { places });
});

app.get('/places/create', (req, res) => {
    res.render('places/create');
});

app.post('/places', async (req, res) => {
    const place = new Place(req.body.place);
    await place.save();
    res.redirect(`/places/${place._id}`);
});

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    const place = await Place.findById(id);
    res.render('places/show', { place });
});

app.get('/places/:id/edit', async (req, res) => {
    const { id } = req.params;
    const place = await Place.findById(id);
    res.render('places/edit', { place });
});

app.put('/places/:id', async (req, res) => {
    await Place.findByIdAndUpdate(req.params.id, { ...req.body.place });
    res.redirect('/places');
});

app.delete('/places/:id', async (req, res) => {
    const { id } = req.params;
    await Place.findByIdAndDelete(id);
    res.redirect('/places');
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