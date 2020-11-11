const models = require('../models');

const parseCookies = (req, res, next) => {
  console.log('Req object:', req.headers.cookie);
  let cookieObject = {};
  if (req.headers.cookie) {
    let splitCookies = req.headers.cookie.split('; ');
    console.log('splitCookies: ', splitCookies);
    for (let i = 0; i < splitCookies.length; i++) {
      let indCookieArray = splitCookies[i].split('=');
      cookieObject[indCookieArray[0]] = indCookieArray[1];
    }
  }
  console.log('Parsed cookie: ', cookieObject);
  req.cookies = cookieObject;
  next();
};

module.exports = parseCookies;