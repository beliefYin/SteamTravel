var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var app = getApp()
const MAN = 0;
const WOMAN = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    iconUrl: "../../image/user-unlogin.png",
    userName: "unlogin",
    sex: MAN,
    womanUrl:"../../image/woman.png",
    manUrl:"../../image/man.png",
    darkWomanUrl:"../../image/darkWoman.png",
    darkManUrl:"../../image/darkMan.png",
    briefIntro:"hello，i am Simon.",
    profileVisble: {
      string: '个人资料他人是否可见',
      checked: 1
    },
    memoryVisble: {
      string: '回忆长廊他人是否可见',
      checked: 1
    }
  },
  SetMan:function(){
    this.setData({sex: MAN})
  },
  SetWoman:function(){
    this.setData({sex: WOMAN})
  },
  ChangeProfileVisble: function(e) {
    if (this.data.profileVisble.checked == 1)
      this.data.profileVisble.checked = 0;
    else
      this.data.profileVisble.checked = 1;
  },
  ChangeMemoryVisble: function(e) {
    if (this.data.memoryVisble.checked == 1)
      this.data.memoryVisble.checked = 0;
    else
      this.data.memoryVisble.checked = 1;
  },
  //确认修改
  ConfirmChange: function(e){
  //写入数据库
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/UpdateUser`,
      data: {
        openId: app.globalData.userInfo.openId,
        sex: this.data.sex, 
        introduction: this.data.briefIntro,
        infoVisible: this.data.profileVisble.checked,
        memoryVisible: this.data.memoryVisble.checked
      },
      success(res){
        app.globalData.infoVisible = that.data.profileVisble.checked;
        app.globalData.memoryVisible = that.data.memoryVisble.checked;
        console.log("UpdateUser success",res);
      },
      fail(error){
        console.log("UpdateUser fail",error)
      }
    });
    app.globalData.hasChangedUserInfo = true;
    wx.switchTab({
      url:"../person/person"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.logged) {
      this.setData({
        userInfo: app.globalData.userInfo,
        iconUrl: app.globalData.userInfo.avatarUrl,
        userName: app.globalData.userInfo.nickName
      })
    }
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
          memoryVisble : {
            string: '个人资料他人是否可见',
            checked: app.globalData.memoryVisible
          },
          profileVisble: {
            string: '回忆长廊他人是否可见',
            checked: app.globalData.infoVisible
          },
        })
        console.log("QuestUser success",res);
      },
      fail(error){
        console.log("QuestUser fail",error)
      }
    })
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
    
  },
  //输入简介
  InputBriefIntro: function (e) {
    this.setData({
      briefIntro: e.detail.value
    })
  }
})