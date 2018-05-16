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
    comments:[

    ],
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
        ------写到分割字符串


        console.log('加载攻略成功', result);
      },
      fail(error) {
        console.log('加载攻略失败', error);
      }
    }
    wx.request(options);
    
  },


})