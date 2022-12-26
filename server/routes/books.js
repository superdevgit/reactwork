const booksController = require('../controller/booksController');
const logger = require('../utils').logger;
const validateToken = require('../utils').validateToken;
const checkPermission = require('../utils').checkPermission;

module.exports = (router) => {
    router.route('/books')
        .post([logger, validateToken, checkPermission], booksController.books);
    router.route('/books/update')
        .post([logger, validateToken, checkPermission], booksController.updateBook);
    router.route('/books')
        .get([validateToken], booksController.findBooks);
    router.route('/books/delete/:id')
        .delete([logger, validateToken, checkPermission],booksController.deleteBook);
};
