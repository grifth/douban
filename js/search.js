{
  let view = {
    el:'#search',
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
      data.subjects.forEach((subject)=>{
        var $node = $(this.template)
        $node.find('.cover img').attr('src',subject.images.medium)
        $node.find('.detail h2').text(subject.title)
        $node.find('.score').text(subject.rating.average)
        $node.find('.detail .extra').eq(0).text(subject.year + ' / ' + subject.genres.join('、'))
        $node.find('.detail .extra').eq(1).text('导演：' + subject.directors.map(v=>v.name).join('、'))
        $node.find('.detail .extra').eq(2).text('主演：' + subject.casts.map(v=>v.name).join('、'))
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
      let keyword = $('.search-area input').val()
      $('.loading').show()
       $.ajax({
                url: '//api.douban.com/v2/movie/search',
                data: {
                    q:keyword
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
      this.bindEventHub()
      this.bindEvents()
    },
    bindEventHub(){
      eventhub.on('select',(data)=>{
        // let  main = this.view.$el
        // let section = main[0]

        let section = this.view.$el

        if(data === 2){
          section.show()
        }else{
          section.hide()
        }

      })
    },
    bindEvents(){
      this.view.$el.find('.search-area .button').on('click',()=>{
        this.model.fetch((ret)=>{
          this.view.render(ret)
          this.model.page++
        })
      })

      this.view.$el.find('.search-area input').on('keyup',(e)=>{

        if(e.key ==='Enter'){
          this.model.fetch((ret)=>{
            this.view.render(ret)
            this.model.page++
          })
        }

      })

      $('main').scroll(()=>{
        console.log(this.isToBottom(this.view.$el, $('main'))&&!this.model.isFinshed&&!this.model.isLoading);
        if(this.isToBottom(this.view.$el, $('main'))&&!this.model.isFinshed&&!this.model.isLoading){


          this.model.fetch((ret)=>{
            this.view.render(ret)
            this.model.page++

            if(this.model.page*this.model.count>ret.total){
              this.model.isFinshed = true
            }

          })
        }
      })
    },
    isToBottom($content,$viewport){
      console.log($viewport.scrollTop())
      let  sHeight = $content.height()
      let  mHeight =  $viewport.height()
      let  mScrollTop = $viewport.scrollTop()
      return   mHeight + mScrollTop + 30 > sHeight
    }
  }

  controller.init(view,model)
}
