/*
  users.js
  Author Erkki Halinen
*/

const express = require('express');
const router = express.Router();
const auth = require('./security/authenticate');
const encrypt = require('./security/encrypt');

/* GET /users listing. */
router.get('/', auth, (req, res, next) => {

  req.db.get('users').find({}, { password: 0 }, (err, resultDocs) => {

    if(err) {
      res.sendStatus(418);
    }

    res.json(resultDocs);
  })
});

/* POST /users create a user */
router.post('/', encrypt, (req, res, next) => {

  const db = req.db;
  const users = db.get('users');

  //Insert into collection
  users.insert({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  },

  (err, result) => {

    if(err) {
      res.send(418);
    }

    res.send('User registered !');
  });
}, err => {

  console.log(err);
  res.send(418);
});

module.exports = router;
