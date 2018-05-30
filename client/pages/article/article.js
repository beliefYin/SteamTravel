var app = getApp()
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    author:'',
    time:'',
    title:'',
    like:'',
    article: [
      //text:"",
      //imgUrl:"",
    ],
    userId:0
  },

  onLoad: function (options) {
    var that = this;
    var options = {
      url: config.service.QueryArticleUrl,

      data:{
        id: app.globalData.articleId
      },
      success(result) {
        if (result.data.data.length == 0)
          return;
        var data = result.data.data[0]
        
        var picUrl = data.pic_url.split('&&&')
        var mainbody = data.mainbody.split('&&&')
        var article = []
        for (let i = 0; i < mainbody.length; i++) {
          var tmp = {
            text:'',
            imgUrl:''
          }
          if(mainbody[i] == "###")
            tmp.text = ''        
          else
            tmp.text = mainbody[i]
          if (picUrl[i] == '###')
            tmp.imgUrl = ''
          else
            tmp.imgUrl = picUrl[i]
          article.push(tmp)
        }
        console.log(article)
        var time = data.timestamp.split('T')
        that.setData({
          article:article,
          author: data.author,
          time: time[0],
          title: data.title,
          like: data.like,
          userId: data.user_id
        })
        console.log('加载攻略成功', result);
      },
      fail(error) {
        console.log('加载攻略失败', error);
      }
    }
    wx.request(options);
  },

  NaviToOther:function() {
    app.globalData.otherUserId = this.data.userId
    wx.navigateTo({
      url: '../watchOther/watchOther',
    })
  }

})