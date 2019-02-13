window.eventhub = {
  events:{},
  on(eventName,fn){
    if(this.events[eventName]===undefined){
      this.events[eventName] = []
    }
    this.events[eventName].push(fn)
  },
  emit(eventName,data){
    this.events[eventName].map((fn)=>{
      fn.call(undefined,data)
    })
  }
}
