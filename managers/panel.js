const path = require('path')
const fs = require("fs");

module.exports = (app) => {
    app.get('/panel/', (req, res) => {
        if (req.query && req.query.user) {
            if (checkUser(req.query.user)) {
                res.sendFile(path.join(__dirname + '/panel/index.html'));
            } else res.sendFile(path.join(__dirname + '../../public/dev_index.html'));
        } else res.sendFile(path.join(__dirname + '../../public/dev_index.html'));
    });

    app.get('/api', async function (req, res) {
        const username = req.query.user
        const command = req.query.command
        const value = req.query.value
        switch (command) {
            case "vbx": {
                if(!checkUser(username)) return res.send("error: 0. Contact Stormzy ")
                const fileName = path.join(__dirname, '../config/', username, "/profiles/profile_common_core.json")
                if(!fileName) return res.send("error: 1. Contact Stormzy ")
                const file = require(fileName);

                file.items['Currency:MtxPurchased'].quantity = parseInt(value, 10);

                fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
                    if (err) return console.log(err);
                });
                res.send("Operation successful")
            break
            }
            case "level": {
                if(!checkUser(username)) return res.send("error: 2. Contact Stormzy ")
                const fileName = path.join(__dirname, '../config/', username, "/profiles/profile_athena.json")
                if(!fileName) return res.send("error: 3. Contact Stormzy ")
                const file = require(fileName);

                file.stats.attributes.level = parseInt(value, 10);

                fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
                    if (err) return console.log(err);
                });
            break
            }
            default:
                res.send("error: 4. Contact Stormzy ")
        }
    });

    function checkUser(username) {
        if (fs.existsSync(path.join(__dirname, '../config/', username))) {
            return true;
        } else return false;
    }
}