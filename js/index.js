// $('footer>div').on('click',function(){
//
//   var index = $(this).index()
//
//   $(this).addClass('active').siblings().removeClass('active')
//   $('section').hide().eq(index).fadeIn()
// })

// var template = `
//   <div class="item">
//     <a href="">
//       <div class="cover">
//         <img src="" alt="">
//       </div>
//       <div class="detail">
//         <h2></h2>
//         <div class="extra">
//           <span class="score"></span>
//           <span class="collect"></span>
//         </div>
//         <div class="extra"></div>
//         <div class="extra"></div>
//       </div>
//     </a>
//   </div>
// `
//
// $.ajax({
//           url: '//api.douban.com/v2/movie/top250',
//           data: {
//             start: 0,
//             count: 20
//           },
//           dataType: 'jsonp'
//         }).done(function(ret){
//           console.log(ret);
//             setData(ret)
//         })
// function setData(data){
//   data.subjects.forEach((subject)=>{
//     var $node = $(template)
//     $node.find('.cover img').attr('src',subject.images.medium)
//     $node.find('.detail h2').text(subject.title)
//     $node.find('.score').text(subject.rating.average)
//     $node.find('.detail .extra').eq(0).text(subject.year + ' / ' + subject.genres.join('、'))
//     $node.find('.detail .extra').eq(1).text('导演：' + subject.directors.map(v=>v.name).join('、'))
//     $node.find('.detail .extra').eq(2).text('主演：' + subject.casts.map(v=>v.name).join('、'))
//
//     $('#top250').append($node)
//   })
// }
