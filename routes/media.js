var express = require('express');
var router = express.Router();

/* GET all media. */
router.get('/', (req, res, next) => {

  const db = req.db;
  const mediaColl = db.get('media');

  const queryResult = mediaColl.find({}, {}, (err, resultDocs) => {

    if(err) {
      res.writeHead(401);
      res.end();
    }

    res.send(200);
    res.json(resultDocs);
  })
});

module.exports = router;
