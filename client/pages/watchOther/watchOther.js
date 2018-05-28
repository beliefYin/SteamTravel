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
    briefIntro:"加载中",
    stars:0, //关注数
    fans:0, //粉丝数
    memoryVisible:1,


    tabs: ["评论", "帖子"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,


    likeUrl:"../../image/like.png",
    dislikeUrl:"../../image/dislike.png",
    commentList : [],
    articleList : [],
    hiddenMessage: true,
    messageContent:"",
  },
  WriteMessage: function () {
    if (!app.globalData.logged) {
      wx.showModal({
        title: '要登录哦',
        content: '您还没有登录，要登录了才能私信哦',
      })
      return;
    }
    this.setData({ hiddenMessage: false });
  },
  SendMessage: function () {
    if (this.data.messageContent == '')
    {
      util.showModel("发送失败","内容不能为空")
    }
    var that = this;
    qcloud.request({
      url: config.service.SendMessageUrl,
      login: true,
      data: {
        send_user_id: app.globalData.userInfo.openId,
        recv_user_id: app.globalData.otherUserId,
        context: this.data.messageContent,
        send_user_icon: app.globalData.userInfo.avatarUrl,
        send_user_name: app.globalData.userInfo.nickName,
      },
      success(res) {
        util.showSuccess("发送成功")
        console.log("send message success", res);
      },
      fail(error) {
        console.log("send message fail", error)
      }
    });
    this.setData({ hiddenMessage: true });
  },
  HideMessage: function () {
    this.setData({ hiddenMessage: true });
  },
  InputMessage: function (event)
  {
    this.data.messageContent = event.detail.value;
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
    this.QueryOtherInfo();
  },

  QueryOtherInfo: function () {
    var that = this;
    console.log(app.globalData.otherUserId)
    qcloud.request({
      url: config.service.QueryOtherUserUrl,
      data: {
        openId: app.globalData.otherUserId,
      },
      success(res) {
        if (res.data.data.length == 0) {
          util.showModel("显示失败","这个用户的信息不可见")
          return
        }
        var data = res.data.data[0]
        console.log("查看他人资料")
        console.log(res)
        that.setData({
          briefIntro: data.introduction,
          sex: data.sex,
          fans: data.fans_number,
          memoryVisible: data.memory_visible,
          iconUrl:data.icon_url,
          userName:data.user_name

        })
        console.log("QuestOtherUser success", res);
        that.QueryArticleList();
        that.LoadComment();
      },
      fail(error) {
        console.log("QuestOtherUser fail", error)
      }
    });
    app.globalData.hasChangedUserInfo = false;
    console.log("refresh")
  },

  LoadComment: function () {
    util.showBusy('请求评论中...')
    var that = this
    var options = {
      url: config.service.queryUserCommentUrl,
      data: {
        userId: app.globalData.otherUserId
      },
      success(result) {
        that.setData({
          commentList: result.data.data
        })
        util.showSuccess('请求评论成功');
        console.log('请求评论成功', result)
      },
      fail(error) {
        util.showModel('请求评论失败', error);
        console.log('请求评论失败', error);
      }
    }
    wx.request(options);
  },

  NavigateToMemory: function () {
    wx.navigateTo({
      url: '../otherMemory/otherMemory',
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
    var options = {
      url: config.service.QueryUserArticleUrl,

      data: {
        uesrId: app.globalData.otherUserId
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
  Star: function () {
    var that = this;
    qcloud.request({
      url: config.service.StarUrl,
      login:true,
      data: {
        myId: app.globalData.userInfo.openId,
        otherId: app.globalData.otherUserId,
        name: app.globalData.userInfo.nickName,
        icon: app.globalData.userInfo.avatarUrl
      },
      success(res) {
        if (res.data.code == -1) {
          util.showModel("关注失败", "你已经关注过他")
          return
        }
        var tmpFans = that.data.fans + 1
        that.setData({
          fans:fans+1
        })
        util.showSuccess("关注成功")
        console.log("Star success", res);
      },
      fail(error) {
        console.log("Star fail", error)
      }
    });
  },
  
})