const theJij = require('kijiji-scraper');

async function search(timestamp, options, params) {
    try {
        const results = await theJij.search(params, options);
        const isNew = timestamp;
        let data = {
            newAds: [],
            mostRecent: timestamp
        }

        for (let i = 0; i < results.length; i++) {
            const date = new Date(results[i].date).getTime();
            if (i === 0) data.mostRecent = date;
            if (date > isNew) data.newAds.push(results[i]);
        }

        return data;

    } catch(err) {
        console.log(new Error(err));
    }
}

module.exports = search;