const search = require('../services/search');
const sendMail = require('../services/sendMail');
const sendSMS = require('../services/sendSMS');

let blacklist = {};

function clearBlacklist() {
    const days = 3;
    setTimeout(() => {
        blacklist = {};
        clearBlacklist();
    }, 1000 * 60 * 60 * 24 * days);
}

clearBlacklist();

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

function handleAds(ads) {
    let sendAds = [];
    for (ad in ads) {
        if (!blacklist[ads[ad].title]) {
            sendAds.push(ads[ad]);
            blacklist[ads[ad].title] = true;
        }
    }
    console.log('blacklisting: ', blacklist);
    if (sendAds.length > 0) {
        const htmlString = sendAds.map(ad => `<p><a href="${ad.url}">${ad.title}</a></p><br>`).reduce((acc, curr) => acc + curr);
        const smsString = sendAds.map(ad => `\n ${ad.url}`).reduce((acc, curr) => acc + curr);
        sendMail('Kijiji Instant Alert!', htmlString);
        sendSMS(smsString);
    }
}

module.exports = searchLoop;