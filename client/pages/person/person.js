// pages/person/person.js

var app = getApp()
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

const LIKE = 1
const DISLIKE = 0

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    iconUrl: "../../image/user-unlogin.png",
    userName: "unlogin",
    sex: 0,
    womanUrl:"../../image/woman.png",
    manUrl:"../../image/man.png",
    memoryBtnUrl:"../../image/memoryBtn.png",
    changeInfoBtnUrl:"../../image/changeInfoBtn.png",
    leftQuotesUrl:"../../image/leftQuotes.png",
    rightQuotesUrl:"../../image/rightQuotes.png",
    briefIntro:"hello，i am Simon.",
    stars:12, //关注数
    fans:111, //粉丝数


    tabs: ["评论", "帖子"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,


    likeUrl:"../../image/like.png",
    dislikeUrl:"../../image/dislike.png",
    sceneList : [
      {
        picUrl:"../../image/man.png",
        name:"留园大幅度对的",
        comment:"这是一个苏州的园拉拉队浪费大量司法所这是一个苏州的园拉拉队浪费大量司法所这是一个苏州的园拉拉队浪费大量司法所",
        like:LIKE,
        agreeNum:23,
        disagreeNum:2,
      },
      {
        picUrl:"../../image/woman.png",
        name:"黄旗山",
        comment:"顶上有一个灯笼",
        like:DISLIKE,
        agreeNum:45,
        disagreeNum:2,
      }
    ],
    articleList : [
      {
        
      },
      {

      },
    ]
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
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
    if (app.globalData.logged) {
      this.setData({
        userInfo: app.globalData.userInfo,
        iconUrl: app.globalData.userInfo.avatarUrl,
        userName: app.globalData.userInfo.nickName
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
  
  },

  NavigateToEditProfile: function () {
    if(app.globalData.logged)
      wx.navigateTo({
        url: '../editProfile/editProfile',
      })
    else
      wx.showModal({
        title: '要登录哦',
        content: '您还没有登录，要登录了才能编辑资料哦',
      })
  },

  NavigateToMemory: function () {
    if(app.globalData.logged)
      wx.navigateTo({
        url: '../memory/memory',
      })
    else
      wx.showModal({
        title: '要登录哦',
        content: '您还没有登录，要登录了进入回忆长廊哦',
      })
  },


})