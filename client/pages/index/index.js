var config = require('../../config')
var util = require('../../utils/util.js')
var app = getApp();
var WxSearch = require('../../wxSearch/wxSearch.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendList:[
      {
        // brief_pic_url: "../../image/loading.png",
        // scenic_spot_name: "镇江",
        // brief_introduction: "镇江是个污染很严重的城市",
        // url: "镇江url"
      },
    ],
    inputCityName: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    WxSearch.init(that, 43, ['北京', '上海', '南京', '广州', '深圳']);    //热门搜索
    WxSearch.initMindKeys(['北京', '上海', '南京', '广州','深圳']);  //搜索建议

    this.RequestRecommendations();
  },
  
  //请求推荐列表
  RequestRecommendations: function () {
    util.showBusy('请求中...')
    var that = this
    var options = {
      url: config.service.recommendationUrl,
      success(result) {
        if (result.data.code == 1)
        {
          console.log("数据库中没有推荐列表数据",result)
          return;
        }
        else
        {
          that.setData({recommendList:result.data.data.scenicSpot})
          util.showSuccess('请求成功');
          console.log('请求推荐列表成功', result)
        }
       
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    }
    wx.request(options);

  },

  // //打开城市页面
  // openCity: function (params) {
  //   app.globalData.naviPlaceId = params.currentTarget.dataset.url
  //   wx.navigateTo({
  //     url: "../scenicSpot/scenicSpot",
  //   })
  // },

  //打开景点页面
  openScenicSpots: function (params) {
    app.globalData.naviPlaceId = params.currentTarget.dataset.placeid
    wx.navigateTo({
      url: "../scenicSpot/scenicSpot",
    })
  },

  //是否为已存在的景点
  isExistScene: function (city) {
    for (var i in this.data.recommendList)
    {
      if (this.data.recommendList[i].cityName == city)
        return i;        
    }
    return -1;
  },

  GetPlaceType: function () {
    
  },

  //↓wxSearch接口
  wxSearchFn: function (e) {
    console.log(e)
    var that = this
    WxSearch.wxSearchAddHisKey(that);
    if (!this.data.inputCityName || this.data.inputCityName == "")
      return;

    util.showBusy('搜索中...')
    var that = this
    var options = {
      url: config.service.getPlaceTypenUrl,
      data: { name: this.data.inputCityName },
      success(result) {
        console.log(result)
        if (result.data.code == 1) { //1为景点
          app.globalData.naviPlaceId = result.data.data[0].scenic_spot_id
          app.globalData.tmpScenicSpotData = result.data.data[0]
          util.showSuccess("")
          wx.navigateTo({ url: '../scenicSpot/scenicSpot' });
        }
        else if (result.data.code == 2) { //2为城市
          app.globalData.naviPlaceId = result.data.data[0].city_id
          app.globalData.tmpCityData = result.data.data[0]
          util.showSuccess("")
          wx.navigateTo({ url: '../city/city' });
        }
        else {
          util.showModel('I’m sorry~','这个小程序还没有这个城市（景点）的信息')
        }
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    }
    wx.request(options);

  },
  wxSearchInput: function (e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
    this.data.inputCityName = e.detail.value
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
    this.data.inputCityName = e.currentTarget.dataset.key;
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
    console.log(e);
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