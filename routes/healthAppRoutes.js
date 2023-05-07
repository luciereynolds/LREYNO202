const express = require('express');
const router = express.Router();
const controller = require('../controllers/healthAppController.js');
const {login} = require('../auth/auth')
const {verify} = require('../auth/auth')

router.get("/", controller.home_page);

router.get("/landing", controller.landing_page);

router.get('/about', controller.about);

router.get('/general',verify, controller.general_health_page);

router.get('/achievements', verify, controller.achievements);

router.get('/sleep', verify, controller.sleep);

router.get('/fitness', verify, controller.fitness);

router.get('/health', verify, controller.health);

/* log in */
router.get('/login', controller.show_login_page);

router.post('/login', login, controller.handle_login);

router.get("/loggedIn",verify, controller.loggedIn_landing);

/* register */
router.get('/register', controller.show_register_page);

router.post('/register', controller.post_new_user);

router.get('/addgoal', controller.show_addgoal);

router.post('/addgoal', controller.post_addgoal);

router.get('/allGoals', verify, controller.allGoals);

router.get('/modifygoal', controller.show_modifyGoal);

router.post('/modifygoal', controller.update_modifyGoal);

router.get('/deletegoal', controller.show_deleteGoal);

router.post('/deletegoal', controller.update_deleteGoal);

router.get("/logout", controller.logout);

router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not Found');
})

router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error');
})

/* End of routes, makes router code accessible to index.js */
module.exports = router;