var express = require('express');
var router = express.Router();
var Note = require('../model/note').Note

/* GET users listing. */
router.get('/notes', function (req, res, next) {
  var opts = {
    raw: true
  }
  if(req.session && req.session.user) opts.where = { userid: req.session.user.id}

  Note.findAll(opts)
    .then(notes => res.send({
      status: 0,
      data: notes
    }))
    .catch(() => res.send({
      status: 1,
      errorMsg: '查询失败'
    }))
});

/*新增add*/
router.post('/notes/add', function (req, res, next) {
  
  if(!req.session || !req.session.user){
    return res.send({status: 1, errorMsg: '请先登录'})
  }

  var note = req.body.note
  var userid = req.session.user.id
  var username = req.session.user.username

  if (!note) {
    return res.send({
      status: 0,
      errorMsg: '内容不能为空！'
    })
  }
  Note.create({
      text: note,
      userid:userid,
      username:username
    })
    .then(notes => res.send({
      status: 0
    }))
    .catch(() => res.send({
      status: 1,
      errorMsg: '数据库异常或者你无权限'
    }))
});

/*修改edit*/
router.post('/notes/edit', function (req, res, next) {
  if(!req.session || !req.session.user){
    return res.send({status: 1, errorMsg: '请先登录'})
  }

  var id = req.body.id
  var note = req.body.note
  Note.update({ text: note}, {where: {id: id } })
    .then((lists) => {
      if(lists[0] === 0){
        return res.send({ status: 1,errorMsg: '你没有权限'});
      }
      res.send({status: 0})
    })
    .catch(() => res.send({status: 1, errorMsg: '数据库异常或者你无权限'}))
});

/*删除delete*/
router.post('/notes/delete', function (req, res, next) {
  if(!req.session || !req.session.user){
    return res.send({status: 1, errorMsg: '请先登录'})
  }

  var id = req.body.id
  Note.destroy({where: {id: id}})
    .then(deleteLen => {
      if(deleteLen === 0){
        return res.send({status: 0})
      } 
      res.send({status: 0})
  })
    .catch(() => res.send({
      status: 1,
      errorMsg: '数据库异常或者你无权限'
    }))
});


module.exports = router;