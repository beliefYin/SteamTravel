var app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    starlist:[],
  },
   
  onLoad: function (options) {
    this.LoadStarlist();
  },
  
  LoadStarlist: function () {
    var that = this

    wx.request({
      url: config.service.QueryStarListUrl,
      data: { myId: app.globalData.userInfo.openId },
      method: 'GET', 
      success: function(res){
        console.log("loadstarlist success",res)
        var data = res.data.data
        that.setData({
          starlist: data
        })
      },
      fail: function() {
        console.log("loadstarlist fail", res)
      },
    })
  },

  NaviToOther: function (event) {
    app.globalData.otherUserId = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../watchOther/watchOther',
    })    
  }

})