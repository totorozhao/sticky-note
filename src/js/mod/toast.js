require('less/toast.less');

function toast(msg,time){
    this.msg = msg  
    this.dismissTime = time || 1000
    this.createToast()
    this.showToast()
}   

toast.prototype = {
    createToast : function(){
        var tpl = `<div class="toast">${this.msg}</div>`
        this.$toast = $(tpl)
        $('body').append(this.$toast)
    },
    showToast : function(){
        var self = this;  // ???
        this.$toast.fadeIn(300,function(){ //在函数内部 this改变了
            setTimeout(function(){ //在该函数内部 this也改变了
                self.$toast.fadeOut(function(){
                    self.$toast.remove()
                })
            },self.dismissTime)
        })
    }
}

function Toast(msg,time){
    return new toast(msg,time)
}

window.Toast = Toast
module.exports.Toast = Toast
//如果Toast是个对象的话可以赋值module.exports = Toast 但是Toast是个函数所以给module.exports怎家一个属性然后赋值