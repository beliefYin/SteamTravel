var app = getApp()
Page({
  data: {
    active:true,
    hasAccredit:0,
    showEnterButton:false
  },

  onLoad:function() {
    var that = this
    wx.getSetting({
      success: function (res) {
        console.log(res)
        if (res.authSetting["scope.userInfo"])
        {
          that.setData({
            hasAccredit: 1
          })
          app.login()
          setTimeout(() => {
            wx.switchTab({
              url: '../index/index',
            })
          }, 3000);
        }
        else
        {
          that.setData({
            hasAccredit: 2
          })
        }
      }
    })
  },
  Accredit:function () {
    this.setData({
      showEnterButton:true
    })
  },
  UserEnter:function()
  {
    app.login()
    wx.switchTab({
      url: '../index/index',
    })
  },
  VisitEnter:function()
  {
    wx.switchTab({
      url: '../index/index',
    })
  }
})