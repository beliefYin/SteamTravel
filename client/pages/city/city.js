// pages/place/place.js
var config = require('../../config')
var util = require('../../utils/util.js')
var app = getApp()
const SCENEICSPOT_VIEW = 1
const ARTICLE_VIEW = 2

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: true,
    imgUrls: [],
    introduction: "这个景点还没有介绍哦",
    placeName: "镇江",
    viewIndex: SCENEICSPOT_VIEW,
    sceneList: [
      {
        imgUrl: "../../image/loading.png",
        name: "北固山"
      },
      {
        imgUrl: "../../image/loading.png",
        name: "金山"
      }
    ],
    articleList: [
      {
        imgUrl: "../../image/广州1.png",
        name: "北固山"
      },
      {
        imgUrl: "../../image/广州2.png",
        name: "金山"
      }
    ]
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
  OpenSceneView:function(e){
    this.setData({viewIndex: SCENEICSPOT_VIEW})
  },
  OpenArticle:function(e){
    this.setData({viewIndex: ARTICLE_VIEW})
  },
  WriteArticle:function(e){
    wx.navigateTo({
      url: '../writeArticle/writeArticle',
    })
  },

  onLoad: function (options) {

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

})