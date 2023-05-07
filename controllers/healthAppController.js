const goalsDAO = require('../models/guestbookModel');
const db = new goalsDAO();
const userDao = require('../models/userModel.js');

db.init();

exports.home_page = function (req, res) {
    res.render("home", {
        title: 'Health Application',
    });
}

exports.landing_page = function (req, res) {
    res.send('<h1>Welcome to health app [name]</h1>');
}

exports.about = function (req, res) {
    res.render("about", {
        title: "Health Application",
        user: "user"
    });
};

exports.general_health_page = function (req, res) {
    res.render("information", {
        title: "Health Application",
        user: "user"
    });
}

exports.achievements = function (req, res) {
    db.getCompleteEntries()
        .then((list) => {
            res.render("achievements", {
                title: "Health Application",
                user: "user",
                entries: list,
            });
        })
        .catch((err) => {
            console.log("promise rejected", err);
        });
};

exports.allGoals = function (req, res) {
    db.getAllEntries()
        .then((list) => {
            res.render("allGoals", {
                title: "Health Application",
                user: "user",
                entries: list,
            });
        })
        .catch((err) => {
            console.log("promise rejected", err);
        });
};

exports.sleep = function (req, res) {
    db.getSleepEntries()
        .then((list) => {
            res.render("sleep", {
                title: "Health Application",
                user: "user",
                entries: list,
            });
        })
        .catch((err) => {
            console.log("promise rejected", err);
        });
};

exports.health = function (req, res) {
    db.getHealthEntries()
        .then((list) => {
            res.render("health", {
                title: "Health Application",
                user: "user",
                entries: list,
            });
        })
        .catch((err) => {
            console.log("promise rejected", err);
        });
};

exports.fitness = function (req, res) {
    db.getFitnessEntries()
        .then((list) => {
            res.render("fitness", {
                title: "Health Application",
                user: "user",
                entries: list,
            });
        })
        .catch((err) => {
            console.log("promise rejected", err);
        });
};

exports.show_login_page = function (req, res) {
    res.render("user/login");
};

exports.handle_login = function (req, res) {
    res.render("home", {
        title: "Health Application",
        user: "user"
    });
};

exports.show_register_page = function (req, res) {
    res.render("user/register");
}

exports.post_new_user = function (req, res) {
    const user = req.body.username;
    const password = req.body.pass;
    if (!user || !password) {
        res.send(401, 'no user or no password');
        return;
    }
    userDao.lookup(user, function (err, u) {
        if (u) {
            res.send(401, "User exists:", user);
            return;
        }
        userDao.create(user, password);
        console.log("register user", user, "password", password);
        res.redirect('/login');
    });
}

exports.show_addgoal = function (req, res) {
    res.render("newGoal", {
        title: "Health Application",
        user: "user"
    });
};

exports.post_addgoal = function (req, res) {
    console.log("processing post-new_entry controller");
    if (!req.body.userID) {
        response.status(400).send("Entries must have a user ID.");
        return;
    }
    db.addEntry(req.body.userID, req.body.goalType, req.body.goalName, req.body.goalDate, req.body.complete);
    res.redirect("/allGoals");
};

exports.logout = function (req, res) {
    res.clearCookie("jwt").status(200).redirect("/");
};

exports.loggedIn_landing = function (req, res) {
    res.render("home", {
        title: 'Health Application'
    });
};

exports.show_modifyGoal = function (req, res) {
    res.render("modifyGoal", {
        title: "Health Application",
        user: "user"
    });
};

exports.update_modifyGoal = function (req, res) {
    console.log("processing post-update_modifyGoal controller");
    if (!req.body.userID) {
        response.status(400).send("Entries must have a user ID.");
        return;
    }
    db.modifyEntry(req.body._id, req.body.userID, req.body.goalType, req.body.goalName, req.body.goalDate, req.body.complete);
    res.redirect("/allGoals");
};

exports.show_deleteGoal = function(req, res) {
    res.render("deleteGoal", {
        title: "Health Application",
        user: "user"
    });
};

exports.update_deleteGoal = function(req, res) {
    console.log("processing post-update_deleteGoal controller");
    if (!req.body._id) {
        response.status(400).send("Entries must have a goal ID.");
        return;
    }
    db.deleteEntry(req.body._id);
    res.redirect("/allGoals");
}
