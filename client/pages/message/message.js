// pages/place/place.js
var config = require('../../config')
var util = require('../../utils/util.js')
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var app = getApp()

Page({

  data: {
    messageIcon: "../../image/message.png",
    messageList:[],
    hiddenMessage: true,
    messageContent: "",
  },

  onLoad:function(){
    this.LoadMessage();
  },

  LoadMessage: function(){
    var that = this
    util.showBusy("打开信箱中")
    wx.request({
      url: config.service.LoadMessageUrl,
      data: { myId: app.globalData.userInfo.openId},
      method: 'GET', 
      success: function(res){
        console.log("load message success",res)
        that.setData({
          messageList:res.data.data
        })
        util.showSuccess("")
      },
      fail: function (res) {
        console.log("load message fail", res)
      },
    })
  },
  WriteMessage: function (event) {
    app.globalData.otherUserId = event.currentTarget.dataset.id;
    this.setData({ hiddenMessage: false });
  },
  SendMessage: function () {
    if (this.data.messageContent == '') {
      util.showModel("发送失败", "内容不能为空")
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
  InputMessage: function (event) {
    this.data.messageContent = event.detail.value;
  },
})