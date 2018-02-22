/*
  media.js
  Author Erkki Halinen
*/

var express = require('express');
var authenticate = require('./security/authenticate');
var router = express.Router();

/* GET all media. */
router.get('/', authenticate, (req, res, next) => {

  const db = req.db;
  const mediaColl = db.get('media');

  const queryResult = mediaColl.find({}, {}, (err, resultDocs) => {

    if(err) {
      res.writeHead(401);
      res.end();
    }

    res.json(resultDocs);
  })
});

/* GET single media using id. */
router.get('/:id', authenticate, (req, res, next) => {

  //Database object
  const db = req.db;
  const mediaColl = db.get('media');

  //extract id from url
  const id = req.params.id;

  const queryResult = mediaColl.findOne(id, {}, (err, resultDocs) => {

    if(err) {
      res.writeHead(401);
      res.end();
    }

    res.json(resultDocs);
  })
});

module.exports = router;
