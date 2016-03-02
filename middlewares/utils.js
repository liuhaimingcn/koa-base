'use strict';

const jsSHA = require("jssha");

exports.shaPassword = function shaPassword(password) {
  let shaObj = new jsSHA("SHA-1", "TEXT");
  shaObj.update(password);
  return shaObj.getHash("HEX");
};