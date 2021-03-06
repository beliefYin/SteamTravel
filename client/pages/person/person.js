// pages/person/person.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
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
    messageIcon: "../../image/message.png",
    briefIntro:"空空如也",
    stars:0, //关注数
    fans:0, //粉丝数
    isLogged:true,
    gm:0,


    tabs: ["评论", "帖子"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,


    likeUrl:"../../image/like.png",
    dislikeUrl:"../../image/dislike.png",
    commentList : [
      {
      // `icon_url` 			VARCHAR(255) 	NOT NULL			COMMENT '头像url',
      // `content` 			VARCHAR(255) 	NOT NULL 	COMMENT '内容',
      // `scenic_spot_name` 	VARCHAR(50) 	NOT NULL 	COMMENT '景点名',
      // `evaluation` 		TINYINT 		NOT NULL 	COMMENT '评价（好评为1，差评为2)',
      // `agree` 			INT UNSIGNED DEFAULT 0 		COMMENT '好评量',
      // `disagree` 			INT UNSIGNED DEFAULT 0 		COMMENT '差评量',
      // `timestamp`			timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '评论时间',
      },
    ],
    articleList : []
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
    if(!app.globalData.userInfo)
    {
      this.setData({ isLogged:false})
      return;
    }

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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.logged) {
      if(!this.data.isLogged)
      {
        this.onLoad();
      }
      this.setData({
        userInfo: app.globalData.userInfo,
        iconUrl: app.globalData.userInfo.avatarUrl,
        userName: app.globalData.userInfo.nickName,
        isLogged: true
      })
    }
    else
    {
      return;
    }
    if(app.globalData.hasChangedUserInfo)
    {
      var that = this;
      qcloud.request({
        url: `${config.service.host}/weapp/QueryUser`,
        data: {
          openId: app.globalData.userInfo.openId,
        },
        success(res){
          if (res.data.code == 1)
          {
            console.log("读取数据失败")
            return
          }
          var data = res.data.data[0]
          that.setData({
            briefIntro:data.introduction,
            sex:data.sex,
            fans:data.fans_number,
            gm:data.gm
          })
          app.globalData.memoryVisible = data.memory_visible;
          app.globalData.infoVisible =  data.info_visible;
          console.log("QuestUser success",res);
        },
        fail(error){
          console.log("QuestUser fail",error)
        }
      });
      app.globalData.hasChangedUserInfo = false;
    }
    this.QueryArticleList();
    this.LoadComment();
    
  },

  LoadComment: function () {
    var that = this
    var options = {
      url: config.service.queryUserCommentUrl,
      login:true,
      data: {
        userId: app.globalData.userInfo.openId
      },
      success(result) {
        that.setData({
          commentList: result.data.data
        })
        console.log('请求评论成功', result)
      },
      fail(error) {
        util.showModel('请求评论失败', error);
        console.log('请求评论失败', error);
      }
    }
    qcloud.request(options);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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
    console.log(this.data.gm)
    if (this.data.gm > 0) {
      wx.navigateTo({
        url: "../gm/gm"
      })
    }
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
  NaviToArticle: function (event) {
    app.globalData.articleId = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../article/article',
    })
  },
  QueryArticleList: function () {
    var that = this;
    if (!app.globalData.logged)
      return;
    var options = {
      url: config.service.QueryUserArticleUrl,

      data: {
        uesrId: app.globalData.userInfo.openId
      },
      success(result) {
        if (result.data.data.length == 0)
          return;
        that.setData({
          articleList: result.data.data
        })
        console.log('加载攻略成功', result);
      },
      fail(error) {
        console.log('加载攻略失败', error);
      }
    }
    wx.request(options);
  },
  WriteArticle: function (e) {
    app.globalData.naviPlaceName = "";
    app.globalData.naviPlaceId = 0;
    wx.navigateTo({
      url: '../writeArticle/writeArticle',
    })
  },
  NaviToStarList: function () {
    wx.navigateTo({
      url: '../starlist/starlist',
    })
  },
  NaviToMessage:function(){
    if (!app.globalData.logged)
      return;

    wx.navigateTo({
      url: '../message/message',
    })
  }
})