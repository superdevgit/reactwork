const winston = require('winston');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = {
    validateToken: (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    let result;
    if (authorizationHeader) {
         const token = req.headers.authorization.split(' ')[1]; 
          
          const options = {
              expiresIn: process.env.JWT_EXPIRES, algorithm: 'HS256'
          }; 
          try {
              result = jwt.verify(token, process.env.JWT_SECRET, options);
              res.locals.user = result;    
              next();
          } catch (err) {
              result = { 
                  error: 'Authentication error. In-valid Token.',
                  status: 401
              };
              res.status(401).send(result);
          }
      } else {
        result = { 
          error: 'Authentication error. Token required.',
          status: 401
        };
        res.status(401).send(result);
      }
    },

    logger: (req, res, next) => {
        logger.add(new winston.transports.Console({
            format: winston.format.simple(),
        }));

        logger.log({
          level: 'info',
          message: req.route.path + ' : ' + Date()
        });
        next();
    },

    checkPermission: (req, res, next) => {       
            let token = req.headers.authorization.split(' ')[1];
            let result;
            let options = {
                  expiresIn: process.env.JWT_EXPIRES, algorithm: 'HS256'
            }; 
            result = jwt.verify(token, process.env.JWT_SECRET, options);
            if(result.role.includes('CREATOR') || result.role.includes('VIEWER')) {
                next();
            } else {
                let resp = { 
                  error: 'You dont have permission to do this action!',
                  status: 401
                };
                res.status(401).send(resp);
            }
    }
};