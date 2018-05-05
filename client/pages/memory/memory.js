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
        urls: [this.data.memoryList[index].imgUrl]
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
    // if(app.globalData.isRefreshMemory)
    // {
      this.LoadMemoryData();
    //   app.globalData.isRefreshMemory = false;
    // }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})