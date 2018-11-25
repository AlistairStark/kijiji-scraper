const search = require('../services/search');
const sendMail = require('../services/sendMail');

function searchLoop(interval, mostRecent, options, params) {
    setTimeout(async () => {
        try {
            const timestamp = mostRecent || Date.now();
            const results = await search(timestamp, options, params);
            console.log(results);
            if (results && results.newAds && results.newAds.length > 0) handleAds(results.newAds);
            let newTimestamp = Date.now();
            if (results && results.mostRecent) newTimestamp = results.mostRecent;
            return searchLoop(interval, newTimestamp, options, params);
        } catch(err) {
            console.log(new Error(err));
        }
    }, interval)
}

async function handleAds(ads) {
    const htmlString = ads.reduce((acc, curr) => `${acc} <p><a href="${curr.url}">${curr.title}</a></p><br>`);
    sendMail('Kijiji Instant Alert!', htmlString);
}

module.exports = searchLoop;