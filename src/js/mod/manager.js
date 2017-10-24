let Toast = require('./toast.js').Toast
let Note = require('./note.js').Note
let Event = require('mod/event.js')
let Manager = (function () {

  function loadAll() {
    $.get('/api/notes').done(function (result) {
      if (result.status === 0) {
        $.each(result.data, function (idx, note) {
          new Note({
            id: note.id,
            context: note.text,
            createTime: note.createdAt.match(/^\d{4}-\d{1,2}-\d{1,2}/),
            username: note.username
          });
        });
       Event.trigger('waterfall')
      } else {
        Toast(result.errorMsg)
      }
    })
  }

  function add() {
    new Note()
  }

  return {
    loadAll: loadAll,
    add: add
  }
})()

module.exports.Manager = Manager