// Import modules
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode');

const port = process.env.PORT || 3000;

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname , '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set handlebars engine and views location
app.set('view engine','hbs');
app.set('views' , viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'Andrew Anter'
    });
});

app.get('/help', (req,res) =>{
    res.render('help',{
       title: 'Help',
       helpText: 'This is a simple web application to get the forecast data for a specific location, You can use the site by typing any location you want or you can get your current location',
       name: "Andrew Anter"
    });
});

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Andrew Anter'
    });
});


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    };
    const address = req.query.address;

    geocode(address , (error, {latitude, longitude, location} = {}) => {
        if ( error ) {
            return res.send({error})
        };

        forecast(latitude,longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            };

            res.send({
                forecast : forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/weather/location', (req, res) => {
    if(!req.query.longitude || !req.query.latitude){
        return res.send({
            error: 'can not get your location'
        });
    }
        const longitude = req.query.longitude;
        const latitude = req.query.latitude;

        forecast(latitude,longitude, (error, forecastData, {country , region}) => {
            if (error){
                return res.send({error})
            };

            res.send({
                forecast : forecastData,
                country,
                region
            });
        });
    
});

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a search term'
        });
    };

    res.send({
        products: []
    });
});

app.get('/help/*',(req, res) => {
    res.render('404', {
        name: "Andrew Anter",
        title: "404",
        errorMessage: 'Help Article not found'
    });
});

// Must be last get function all the time in order to work
app.get('*' , (req, res) => {
    res.render('404', {
        name: "Andrew Anter",
        title: "404",
        errorMessage: 'Page Not Found'
    });
});

app.listen(port , () => {
    console.log('Server is up on port 3000.')
});   
