var app = getApp();
var WxSearch = require('../../wxSearch/wxSearch.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendList:[
      {
        picUrl: "../../image/loading.png",
        cityName: "镇江",
        introduction: "镇江是个污染很严重的城市",
        url: "镇江url"
      },
      {
        picUrl: "../../image/loading.png",
        cityName: "广州",
        introduction: "广州是个旧旧的城市",
        url: "广州url"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    WxSearch.init(that, 43, ['北京', '上海', '南京', '广州', '深圳']);
    WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
  },



  //打开景点页面
  openScenicSpots: function (params) {
    app.globalData.placeUrl = params.currentTarget.dataset.url
    wx.navigateTo({
      url: "../place/place",
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
    })
  },

  //是否为已存在的景点
  isExistScene: function (city) {
    
  },

  //↓wxSearch接口
  wxSearchFn: function (e) {
    var that = this
    WxSearch.wxSearchAddHisKey(that);

  },
  wxSearchInput: function (e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
  },
  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  },
  //↑wxSearch接口

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