const { verifyToken } = require('../utils/user');
const { sendError } = require('../utils/util');
const { isValidObjectId } = require('mongoose');

exports.handleResponse = (cb, msg) => {
  return async (req, res, next) => {
    try {
      let data;
      if (req.params.id && req.body) {
        data = await cb(req.params.id, req.body);
      } else if (req.params.id && !req.body) {
        data = await cb(req.params.id);
      } else {
        data = await cb(req.body);
      }
      res.status(200).json(data ? data : { message: msg });
    } catch (error) {
      next(error);
    }
  };
};

exports.validateUtility = (options, ref) => {
  return async (req, res, next) => {
    const id = req.params.id;
    try {
      if (options) {
        if (options.idValidator) {
          if (!isValidObjectId(id)) {
            sendError(`${ref} doesn't exist in the database`, 404);
          }
        }
        if (options.tokenValidator) {
          await verifyToken(req.headers);
        }
        // if (options.dataValidator) {
        //   const data = await options.dataValidator(id);
        //   if (!data) {
        //     sendError(`${ref} doesn't exist in the database`, 404);
        //   }
        // }
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
