// pages/person/person.js

var app = getApp()
const COMMENT_VIEW = 1
const ARTICLE_VIEW = 2

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
    stats:12, //关注数
    fans:111, //粉丝数
    viewSwitch:1,//用于切换标签页
    likeUrl:"../../image/like.png",
    dislikeUrl:"../../image/dislike.png",
    sceneList : [
      {
        picUrl:"../../image/man.png",
        name:"留园",
        comment:"这是一个苏州的园林",
        like:LIKE,
        agreeNum:23,
        disagreeNum:2,
      },
      {
        picUrl:"../../image/man.png",
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

  OpenCommentView: function () {
    this.setData({
      viewSwitch:COMMENT_VIEW
    })
  },

  OpenArticleView: function () {
    this.setData({
      viewSwitch:ARTICLE_VIEW
    })
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