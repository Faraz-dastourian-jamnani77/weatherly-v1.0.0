const geocode = require('./utils/geocode')
const weatherStats = require('./utils/weatherStats')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Faraz Dastourian'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Faraz Dastourian'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Faraz Dastourian'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must write your address!'
        })
    }
    geocode(req.query.address, (error, { longitude, latitude, placeName }={}) => {
        if (error) {
            return res.send({ error })
        }

        weatherStats(longitude, latitude, (error, forcastData) => {
            if (error) {
            return res.send({ error })

            }
            res.send({
                forcast: forcastData,
                location: placeName,
                address: req.query.address

            })
        })

    })

})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must search sth '
        })
    }

    console.log(req.query)
    res.send({
        products: []

    })
})

app.get('/help/*', (req, res) => {
    res.render('Error', {
        title: "404",
        name: "Faraz Dastourian",
        errorMessage: "Help article not found :("
    })

})



app.get('*', (req, res) => {
    res.render('Error', {
        title: "404",
        name: "Faraz Dastourian",
        errorMessage: "Page not found :("
    })

})

app.listen(port, () => {
    console.log(`Server up on port ${port}`)
})









