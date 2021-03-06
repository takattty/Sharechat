const express = require('express');
const router = express.Router();
const connection = require('../mysqlConnection');
const unescape = require('../public/javascripts/escape/unescape');

/* GET home page. */
router.get('/index', function(req, res, next) {
  const query = 'SELECT id, name FROM room';
  connection.query(query, (err, rows) => {
    if (err) throw err;
    console.log(rows)
    const unescaped_room_name = unescape(rows[0].name);
    rows[0].room_name = unescaped_room_name;
    res.render('room-index', { room_info: rows });
  });
});

module.exports = router;