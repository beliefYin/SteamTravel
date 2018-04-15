// pages/place/place.js
var app = getApp()
const GOOD = 1
const BAD = 2

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: true,
    imgUrls: ["../../image/广州1.png", "../../image/广州2.png"],
    introduction: "这个景点还没有介绍哦",
    placeName: "北固山",
    commentList:[
      {
        name:"simon",
        picUrl:"../../user-unlogin.png",
        attitude:GOOD,//好评或差评
        agreeNum:100,
        disagreeNum:23,
      },
      {
        name:"simon",
        picUrl:"../../user-unlogin.png",
        attitude:BAD,//好评或差评
        agreeNum:10,
        disagreeNum:23,
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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