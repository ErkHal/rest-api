/*
  authenticate.js
  Author Erkki Halinen
*/

/*
  Authenticates the request via x-access-token header
  Unfinished, just a dummy verification right now
*/
function authenticateRequest(req, res,  next) {

  const token = req.headers['x-access-token'];
  //console.log(token);

  if(token) {

    next();

  } else {

    res.sendStatus(418);
    res.end();

  }
}

module.exports = authenticateRequest;
