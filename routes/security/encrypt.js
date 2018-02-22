/*
  encrypt.js
  Author Erkki Halinen

  Encryption middleware for the register endpoint.
  Uses bcrypt library.
*/

const express = require('express');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 12;

/* Encrypt the password coming from the registering user */
function encrypt(req, res, next) {
  //console.log(req.body.password);

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) =>{
        if(err) return next(err);

        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err) return next(err);

            req.body.password = hash;
            next();
        });
    });
}

module.exports = encrypt;
