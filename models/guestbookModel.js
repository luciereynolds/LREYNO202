const userDao = require('../models/userModel.js');

const nedb = require('nedb');
class GuestBook {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }
    //a function to seed the database
    init() {
        this.db.insert({
            userID: 'Peter',
            goalType: 'Fitness',
            goalName: 'Work out for an hour',
            goalDate: '2020/02/18',
            complete: 'n'
        });
        //for later debugging
        console.log('db entry Peter inserted');

        this.db.insert({
            userID: 'Ann',
            goalType: 'Health',
            goalName: 'Eat more vegetables',
            goalDate: '2023/05/18',
            complete: 'n'
        });
        //for later debugging
        console.log('db entry Ann inserted');

        this.db.insert({
            userID: 'Ann',
            goalType: 'Sleep',
            goalName: 'Wake up at 7am',
            goalDate: '2020/02/18',
            complete: 'y'
        });
        //for later debugging
        console.log('db entry Ann inserted');

        this.db.insert({
            userID: 'lucie',
            goalType: 'Sleep',
            goalName: 'Sleep 8 hours',
            goalDate: '2023/05/20',
            complete: 'n'
        });
        //for later debugging
        console.log('db entry lucie inserted');
    }
    //a function to return all entries from the database
    getAllEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.db.find({}, function (err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise & return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('function all() returns: ', entries);
                }
            })
        })
    }
    getFitnessEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //find(author:'Peter) retrieves the data,
            //with error first callback function, err=error, entries=data
            this.db.find({ goalType: 'Fitness', complete: 'n' }, function (err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise and return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('getFitnessEntries() returns: ', entries);
                }
            })
        })
    }

    getHealthEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //find(author:'Peter) retrieves the data,
            //with error first callback function, err=error, entries=data
            this.db.find({ goalType: 'Health', complete: 'n' }, function (err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise and return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('getHealthEntries() returns: ', entries);
                }
            })
        })
    }

    getSleepEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //find(author:'Peter) retrieves the data,
            //with error first callback function, err=error, entries=data
            this.db.find({ goalType: 'Sleep', complete: 'n' }, function (err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise and return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('getSleepEntries() returns: ', entries);
                }
            })
        })
    }

    getCompleteEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //find(complete: 'y') retrieves the data,
            //with error first callback function, err=error, entries=data
            this.db.find({ complete: 'y' }, function (err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise and return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('getCompleteEntries() returns: ', entries);
                }
            })
        })
    }

    addEntry(userID, goalType, goalName, goalDate, complete) {
        var entry = {
            userID: userID,
            goalType: goalType,
            goalName: goalName,
            goalDate: goalDate,
            complete: complete,
        }
        console.log('entry created', entry);
        this.db.insert(entry, function (err, doc) {
            if (err) {
                console.log('Error inserting document', subject);
            } else {
                console.log('document inserted into the database', doc);
            }
        })
    }

    modifyEntry(_id, userID, goalType, goalName, goalDate, complete) {
        var entry = {
            _id: _id,
            userID: userID,
            goalType: goalType,
            goalName: goalName,
            goalDate: goalDate,
            complete: complete,
        }
        console.log('entry created', entry);
        this.db.update(
            {_id:_id}, 
            {$set: {
            userID: userID,
            goalType: goalType,
            goalName: goalName,
            goalDate: goalDate,
            complete: complete,},},
            {}, function (err, docs) {
                if (err) {
                    console.log('error updating documents', err);
                } else {
                    console.log(docs, 'documents updated')
                }
            });
    }

    deleteEntry(_id) {
    this.db.remove({_id: _id}, {}, function(err, docsRem) {
            if (err) {
                console.log("error deleting document");
            } else {
                console.log(docsRem, "document removed from database");
            }
        })
    }
}

module.exports = GuestBook;