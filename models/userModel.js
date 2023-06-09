const Datastore = require("nedb");
const bcrypt = require('bcrypt');
const saltRounds = 10;
class UserDAO {
    constructor(dbFilePath) {
        if (dbFilePath) {
            //embedded
            this.db = new Datastore({
                filename: dbFilePath,
                autoload: true
            });
        } else {
            //in memory
            this.db = new Datastore();
        }
    }
    // for the demo the password is the bcrypt of the user name
    init() {
        this.db.insert({
            user: 'Peter',
            password:
                '$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2C'
        });
        this.db.insert({
            user: 'Ann',
            password:
                '$2b$10$bnEYkqZM.MhEF/LycycymOeVwkQONq8kuAUGx6G5tF9UtUcaYDs3S'
        });
        this.db.insert({
            user: 'lucie',
            password: 
                '$2b$10$85nWQZS92loRn6n..Sc7K.fHnVxQXxVuzr0fyN1vQH5wq3OQe5LyK'
        })
        return this;
    }
    create(username, password) {
        const that = this;
        bcrypt.hash(password, saltRounds).then(function (hash) {
            var entry = {
                user: username,
                password: hash,
            };
            that.db.insert(entry, function (err, doc) {
                if (err) {
                    console.log("Can't insert user: ", username);
                } else{
                    console.log('document inserted into the database', doc);
                }
            });
        });
    }
    lookup(user, cb) {
        this.db.find({ 'user': user }, function (err, entries) {
            if (err) {
                return cb(null, null);
            } else {
                if (entries.length == 0) {
                    return cb(null, null);
                }
                return cb(null, entries[0]);
            }
        });
    }
}
const dao = new UserDAO();
dao.init();
module.exports = dao;
