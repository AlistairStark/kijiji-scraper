const express = require('express');
const bodyParser = require('body-parser');
const theJij = require('kijiji-scraper');
const sendSMS = require('./services/sendSMS');
require('dotenv').config();

const searchLoop = require('./jobs/initPolling');

const port = process.env.PORT || 3000;

let app = express();

/*
    Middleware
*/
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

/*
    Listen
*/
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
    let options1 = {
        minResults: 40
    };
    let params1 = {
        locationId: '1700185',
        categoryId: theJij.categories.REAL_ESTATE.APARTMENTS_AND_CONDOS_FOR_RENT.BACHELOR_AND_STUDIO.id,
        sortByName: 'dateDesc',
        ad: 'OFFER',
        maxPrice: '1200',
        address: 'KP2+2N1',
        ll: '45.415815, -75.696967',
        radius: '2'
    };

    let options2 = {
        minResults: 40
    };
    let params2 = {
        locationId: '1700185',
        categoryId: theJij.categories.REAL_ESTATE.APARTMENTS_AND_CONDOS_FOR_RENT.ONE_BEDROOM.id,
        sortByName: 'dateDesc',
        ad: 'OFFER',
        maxPrice: '1200',
        address: 'KP2+2N1',
        ll: '45.415815, -75.696967',
        radius: '2'
    };
    
    const time = 5000;

    searchLoop(time, Date.now(), options1, params1);
    searchLoop(time, Date.now(), options2, params2);
});
