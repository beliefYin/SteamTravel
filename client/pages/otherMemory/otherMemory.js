var config = require('../../config')
var util = require('../../utils/util.js')
var qcloud = require('../../vendor/wafer2-client-sdk/index')

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    memoryList: [
    ],
  },

  // 预览图片
  previewImg: function (e) {
    var index = e.currentTarget.dataset.index;
    wx.previewImage({
        urls: [this.data.memoryList[index].imgUrl]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.LoadMemoryData();
  },

  LoadMemoryData:function () {
    var that = this;
    qcloud.request({
      url: config.service.queryOtherMemoryUrl,
      login: true,
      data: {
        userId: app.globalData.otherUserId,
      },
      success(res) {
        that.setData({
          memoryList:res.data.data
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
  },
})