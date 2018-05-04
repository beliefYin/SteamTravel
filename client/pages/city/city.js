// pages/place/place.js
var config = require('../../config')
var util = require('../../utils/util.js')
var app = getApp()
const SCENEICSPOT_VIEW = 1
const ARTICLE_VIEW = 2
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: true,
    imgUrls: [],
    introduction: "这个城市还没有介绍哦",
    placeName: "城市名",
    viewIndex: SCENEICSPOT_VIEW,
    sceneList: [

    ],
    articleList: [

    ],

    tabs: ["景点", "攻略"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  NavigateToScenicSpot:function(e)
  {
    wx.navigateTo({
      url: '../scenicSpot/scenicSpot',
    })
  },
  NavigateToArticle:function(e)
  {
    wx.navigateTo({
      url: '../article/article',
    })
  },

  WriteArticle:function(e){
    wx.navigateTo({
      url: '../writeArticle/writeArticle',
    })
  },

  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    this.LoadScenicSpot();
  },

  RequestCityData: function () {
    util.showBusy('请求中...')
    var that = this
    var options = {
      url: config.service.queryCityUrl,
      data: {
        cityId: app.globalData.naviPlaceId
      },
      success(result) {
        console.log('请求景点信息成功',result)
        if (result.data.code == 1) {
          util.showModel('请求出错', '还没收录这个地方');
          return;
        }
        else {
          var resData = result.data.data[0]
          var imgUrlStr = resData.pic_url
          var tmpImgUrl = imgUrlStr.split(';')
          that.setData({
            placeName: resData.city_name,
            introduction: resData.introduction,
            imgUrls: tmpImgUrl
          })
          util.showSuccess('请求成功');
        }

      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    }
    wx.request(options);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.tmpCityData) {
      var resData = app.globalData.tmpCityData
      var imgUrlStr = resData.pic_url
      var tmpImgUrl = imgUrlStr.split(';')
      this.setData({
        placeName: resData.city_name,
        introduction: resData.introduction,
        imgUrls: tmpImgUrl
      })
      //app.globalData.tmpCityData = null;
    }
    else
      this.RequestCityData();

  },
  LoadScenicSpot: function (params) {
    var that = this
    var options = {
      url: config.service.queryScenicSpotACity,
      data: {
        cityId: app.globalData.naviPlaceId
      },
      success(result) {
        that.setData({
          sceneList: result.data.data
        })
        console.log('请求景点列表成功', result)
      },
      fail(error) {
        util.showModel('请求景点列表失败', error);
        console.log('请求景点列表失败', error);
      }
    }
    wx.request(options);
  },
  openScenicSpots: function (params) {
    app.globalData.naviPlaceId = params.currentTarget.dataset.placeid
    wx.navigateTo({
      url: "../scenicSpot/scenicSpot",
    })
  },
})