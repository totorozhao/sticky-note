var EventCenter = (function(){

     var events = {}

     function on(eventname,handler){
        events[eventname] = events[eventname]  || []
        events[eventname].push({handler:handler})
     }
     function trigger(eventname){
         var handers = events[eventname] 
         if(!handers)return ;           
         for(var i= 0;i<handers.length;i++){
            handers[i].handler()
         }
     }
     return {
         on:on,          //订阅
         trigger:trigger //发布
     }


})()

module.exports = EventCenter