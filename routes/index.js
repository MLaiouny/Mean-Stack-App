/* jshint esversion: 6 */
let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
    res.render('./views/index.html');
});

module.exports = router;
