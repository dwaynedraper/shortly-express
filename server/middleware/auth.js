const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (req.cookies.shortlyid === undefined) {
    models.Sessions.create()
      .then((sessionPromise) => {
        let id = sessionPromise.insertId;
        models.Sessions.get({id})
          .then((session) => {
            req.session = session;
            res.cookie('shortlyid', session.hash);
            next();
          });
      });
  } else {
    let options = {};
    options.hash = req.cookies.shortlyid;
    models.Sessions.get(options).
      then((session) => {
        if (session === undefined) {
          models.Sessions.create().
            then((sessionPromise) => {
              let id = sessionPromise.insertId;
              models.Sessions.get({id}).
                then((session) => {
                  req.session = session;
                  res.cookie('shortlyid', session.hash);
                  next();
                });
            });
        } else {
          req.session = session;
          res.cookie('shortlyid', session.hash);
          next();
        }
      });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

