const booksRoutes = require('./books');
const userRoutes = require('./user');

module.exports = (router) => {
    booksRoutes(router);
    userRoutes(router);
  return router;
};