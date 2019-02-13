{
  let view = {
    el:'#northUs',
    template:`
      <div class="item">
        <a href="">
          <div class="cover">
            <img src="" alt="">
          </div>
          <div class="detail">
            <h2></h2>
            <div class="extra">
              <span class="score"></span>
              <span class="collect"></span>
            </div>
            <div class="extra"></div>
            <div class="extra"></div>
          </div>
        </a>
      </div>
    `,
    init(){
        this.$el = $(this.el)
    },
    render(data){
      data.subjects.forEach((information)=>{
        var $node = $(this.template)
        $node.find('a').attr('href',information.subject.alt)
        $node.find('.cover img').attr('src',information.subject.images.medium)
        $node.find('.detail h2').text(information.subject.title)
        $node.find('.score').text(information.subject.rating.average)
        $node.find('.detail .extra').eq(0).text(information.subject.year + ' / ' + information.subject.genres.join('、'))
        $node.find('.detail .extra').eq(1).text('导演：' + information.subject.directors.map(v=>v.name).join('、'))
        $node.find('.detail .extra').eq(2).text('主演：' + information.subject.casts.map(v=>v.name).join('、'))
        $(this.el).find('.container').append($node)
      })
    }

  }

  let model = {
    page:0,
    count:10,
    isLoading:false,
    isFinshed:false,
    fetch(callback){
      this.isLoading = true
      $('.loading').show()
       $.ajax({
                url: '//api.douban.com/v2/movie/us_box',
                data: {
                  start: this.page*this.count,
                  count: this.count
                },
                dataType: 'jsonp'
              }).done((ret)=>{
                this.isLoading = false
                $('.loading').hide()
                callback(ret)
              })
    },
  }

  let controller = {
    init(view,model){
      this.view = view
      this.model = model
      this.view.init()
      this.model.fetch((ret)=>{
        console.log(ret);
        this.view.render(ret)
        this.model.page++
      })
      this.bindEventHub()
      // this.bindEvents()
    },
    bindEventHub(){
      eventhub.on('select',(data)=>{
        // let  main = this.view.$el
        // let section = main[0]

        let section = this.view.$el

        if(data === 1){
          section.show()
        }else{
          section.hide()
        }

      })
    }
  }

  controller.init(view,model)
}
