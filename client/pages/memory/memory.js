var config = require('../../config')
var util = require('../../utils/util.js')
var qcloud = require('../../vendor/wafer2-client-sdk/index')

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addMemoryImage : "../../image/addMemoryBtn.png",

    memoryList: [
      // {
      //   pic_url,
      //   memory_visible,
      //   like,
      //   timestamp,
      //   content
      // },
    ],
  },

  navigateToAddMemory: function(e){
    wx.navigateTo({
      url: '../addMemory/addMemory',
    })
  },

  // 预览图片
  previewImg: function (e) {
    var index = e.currentTarget.dataset.index;
    wx.previewImage({
      urls: [this.data.memoryList[index].pic_url]
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  LoadMemoryData:function () {
    var that = this;
    qcloud.request({
      url: config.service.querySelfMemoryUrl,
      login: true,
      data: {
        userId: app.globalData.userInfo.openId,
      },
      success(res) {
        var list = res.data.data
        for (let index = 0; index < list.length; index++) {
          var item = list[index];
          console.log(item)
          var time = item.timestamp.split('T')
          console.log(time)
          list[index].time = time[0]
        }



        that.setData({
          memoryList: list
        })
        console.log("LoadMemory success", res);
      },
      fail(error) {
        console.log("LoadMemory fail", error)
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // if(app.globalData.isRefreshMemory)
    // {
      this.LoadMemoryData();
    //   app.globalData.isRefreshMemory = false;
    // }
  },

})