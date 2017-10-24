require('less/index.less');
require('less/note.less')
let Toast = require("mod/toast.js").Toast
let Manager = require('mod/manager.js').Manager
let WaterFall = require('mod/waterfall.js')
let Event = require('mod/event')

Manager.loadAll()
$('.add-note').on('click',function(){
    Manager.add()
})


Event.on('waterfall', function () { //发布事件
    WaterFall.init($("#content"));
})