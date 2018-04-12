var app = getApp()

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
    darkWomanUrl:"../../image/darkWoman.png",
    darkManUrl:"../../image/darkMan.png",
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
    
  }
})