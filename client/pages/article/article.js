var app = getApp()
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    author:'',
    time:'',
    title:'',
    article: [
      //text:"",
      //imgUrl:"",
    ],
  },

  onLoad: function (options) {
    var that = this;

    var options = {
      url: config.service.QuerySceneArticleUrl,

      data:{
        sceneId: 0,//app.globalData.naviPlaceId
      },
      success(result) {
        this.setData({
          article: article
        })
          console.log('查询攻略信息成功', result);
      },
      fail(error) {
          console.log('查询攻略信息成功失败', error);
      }
    }
    wx.request(options);
    
  },


})