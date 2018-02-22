/*
  login.js
  Author Erkki Halinen

*/

const express = require('express');
const router = express.Router();
const encrypt = require('./security/encrypt');

/* POST login user */
router.post('/', encrypt, (req, res, next) => {

  req.db.get('users').findOne({
    username: req.body.username,
    password: req.body.password
  }, (err, resultUser) => {

    if(err) {
      console.log(err);
      res.send(418);
    }

    res.setHeader('x-access-token', 'imATokenPleaseTakeMeSeriously');
    res.send('That token is fake. In the future you will get a real token for this !');
  });

});

module.exports = router;
