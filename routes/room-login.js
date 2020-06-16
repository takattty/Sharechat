const express = require('express');
const router = express.Router();
const connection = require('../mysqlConnection');
const bcryot = require('bcrypt');
const { validationResult } = require('express-validator');
const validationCheck = require('../public/javascripts/validation/room-login/validation');

//ルームログインページの表示
router.get('/:id/login', function(req, res, next) { 
  const roomId_url = req.params.id;
  const query = 'SELECT room_id, room_name, room_memo FROM room WHERE room_id = ?';
  connection.query(query, [roomId_url], (err, rows) => {
    if (err) throw err;
    res.render('room-login', { room_show: rows[0]});
  });
});

//ルームログイン処理
router.post('/:id/login', validationCheck, (req, res, next) => {
  const roomId = req.params.id;
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    console.info(validationError.errors);
    res.redirect('/room/' + roomId + '/login');
  } else {
    const query = 'SELECT room_id, room_pass FROM room WHERE room_id = ?';
    connection.query(query, [roomId], (err, rows) => {
      if (err) throw err;
      const plaintextPassword = req.body.pass;
      const room_pass = rows[0].room_pass;
      bcryot.compare(plaintextPassword, room_pass, (err, result) => {
        if(result === true) {
          req.session.room_id = roomId;//ここでroom_idの保存
          res.redirect('/chat/' + req.params.id);
        } else {
          console.log(err);
          res.redirect('/room/' + req.params.id + '/login');
        }
      });
    });
  }
});

module.exports = router;