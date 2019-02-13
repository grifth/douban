{

  let view = {
    el:'footer>div',
    init(){
      return this.$el =  $(this.el)
    }
  }

  let model = {}

  let controller = {

    init(view,model){
      this.view = view
      this.model = model
      this.view.init()
      this.bindEvents()
    },
    bindEvents(){
      this.view.$el.on('click',function(){
        var index = $(this).index()
        $(this).addClass('active').siblings().removeClass('active')
        eventhub.emit('select',index)
      })
    }

  }

  controller.init(view,model)

}
