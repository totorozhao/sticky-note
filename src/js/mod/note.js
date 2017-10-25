require('less/note.less')

var Event = require('mod/event.js')
var Toast = require('mod/toast.js').Toast

function Note(opts) {
  this.initOpts(opts)
  this.createNote()
  this.setStyle()
  this.eventHandler()
}

Note.prototype = {

  colors: [
    ['#ea9b35', '#efb04e'], // headColor, containerColor
    ['#dd598b', '#e672a2'],
    ['#eee34b', '#f2eb67'],
    ['#c24226', '#d15a39'],
    ['#c1c341', '#d0d25c'],
    ['#3f78c3', '#5591d2']
  ],

  defaultOpts: {
    id: '',
    $ct: $('#content').length > 0 ? $('#content') : $('body'),
    context: '在这填写',
    createTime:new Date().toLocaleDateString().replace(/\//g,'-'),
    username:'wo'
  },

  initOpts: function (opts) {
    this.opts = $.extend({}, this.defaultOpts, opts || {})
    if (this.opts.id) this.id = this.opts.id
  },

  createNote: function () {
    var tpl = `<div class="note">
        <div class="note-header">
          <span class="delete">&times;</span>
        </div>
        <div class="note-cnt" contenteditable="true">${this.opts.context}</div>
        <div class="note-info"><div class="note-name">${this.opts.username}</div><div class="note-time">${this.opts.createTime}</div></div>
      </div>`;
    this.$note = $(tpl)
    this.opts.$ct.append(this.$note)
    Event.trigger('waterfall')
  },

  setStyle: function () {
    var idx = this.colors[Math.floor(Math.random() * 6)];
    this.$note.find('.note-header').css('background-color', idx[0])
    this.$note.find('.note-cnt').css('background-color', idx[1])
    this.$note.find('.note-info').css('background-color', idx[1])
  },
  setLayout: function () {
    var self = this

    if (self.timeId) clearTimeout(self.timeId)
    self.timeId = setTimeout(function () {
      Event.trigger('waterfall');
    }, 100)
  },
  eventHandler: function () {
    var self = this,
    $note = this.$note,
    $noteHead = $note.find('.note-header'),
      $noteCnt = $note.find('.note-cnt'),
      $delete = $note.find('.delete');

    $delete.on('click', function () {
      self.delete()
    })

    $noteCnt.on('focus', function () {
      if ($noteCnt.html() == '在这填写') $noteCnt.html('')
      $noteCnt.data('before', $noteCnt.html())
    }).on('blur paste', function () { //失去焦点时，有操作
      var msg = $noteCnt.html()
      if ($noteCnt.data('before') == msg) return
      $noteCnt.data('before', msg)
      self.setLayout()
      if (self.id) { //修改
        self.edit(msg)
      } else { //新增
        self.add(msg)
      }
    })
    $note.hover(function(){
      $delete.fadeIn()
    },function(){
      $delete.hide()
    })


    $delete.on('click', function () {
      self.delete()
    })

    //设置移动
    $noteHead.on('mousedown', function (e) {
      let evtX = e.pageX - $note.offset().left, //evtX 计算事件的触发点在 dialog内部到 dialog 的左边缘的距离
        evtY = e.pageY - $note.offset().top;
      $note.addClass('draggable').data('evtPos', {
        x: evtX,
        y: evtY
      }); //把事件到 dialog 边缘的距离保存下来
    }).on('mouseup', function () {
      $note.removeClass('draggable').removeData('evtPos');
    });
    $('body').on('mousemove', function (e) {
      $('.draggable').length && $('.draggable').offset({
        left: e.pageX - $('.draggable').data('evtPos').x,
        top: e.pageY - $('.draggable').data('evtPos').y
      })
    })

  },
  edit: function (msg) {
    var self = this
    $.post('/api/notes/edit', {
      id: this.id,
      note: msg
    }).done(function (result) {
      if (result.status === 0) {
        Toast('update success')
      } else {
        Toast(result.errorMsg)
      }
    })
  },
  add: function (msg) {
    var self = this
    $.post('/api/notes/add', {
      note: msg
    }).done(function (result) {
      if (result.status === 0) {
        Toast('add success')
      } else {
        Toast(result.errorMsg)
      }
    })
  },
  delete: function () {
    var self = this
    $.post('/api/notes/delete', {
      id: this.id
    }).done(function (result) {
      if (result.status === 0) {
        Toast('delete success')
        self.$note.remove()
        Event.trigger('waterfall')   
      } else {
        Toast(result.errorMsg)
      }
    })
  }

}
module.exports.Note = Note;