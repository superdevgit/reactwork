const authController = require('../controller/authController');
const logger = require('../utils').logger;

module.exports = (router) => {
    router.route('/auth/register')
        .post([logger], authController.register);
    router.route('/auth/login')
        .post([logger], authController.login);
};
