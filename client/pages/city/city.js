// pages/place/place.js
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
        imgUrl: "../../image/IMG_20140711_201049.jpg",
        name: "北固山"
      },
      {
        imgUrl: "../../image/IMG_20140713_075457.jpg",
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
    var url = app.globalData.placeUrl;
    console.log(url);
    
    if(url == "镇江url")
    {
      var imageList = ["../../image/镇江1.png", "../../image/镇江2.png"]
      this.setData({
        placeName: "镇江",
        imgUrls: imageList
      })
    }
    else if(url == "广州url")
    {
      var imageList = ["../../image/广州1.png", "../../image/广州2.png"]
      this.setData({
        placeName: "广州",
        imgUrls: imageList
      })
    }
    
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