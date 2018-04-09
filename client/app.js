//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    globalData: {
      userInfo: null,
      code: null,
      isLoginSuc: false,
      placeUrl: null,
    },
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
        var that = this;
        wx.login({
          success: function (loginSucRes) {
            that.globalData.code = loginSucRes.code;
            that.globalData.isLoginSuc = true;

            wx.getUserInfo({
              success: function (res) {
                that.globalData.userInfo = res.userInfo
              },
            })
          },
          fail: function () {
            wx.showModal({
              title: "登录失败",
              content: "失败了哦",
            })
          },

        })
    }
})