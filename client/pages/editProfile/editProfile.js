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
    briefIntro:"hello，i am Simon.",
    checkboxItems: [
      {value: 'USA', string: '个人资料他人是否可见', checked: 'true'},
      {value: 'CHN', string: '回忆长廊他人是否可见', checked: 'true'},
    ],
    profileVisble: {
      string: '个人资料他人是否可见',
      checked: 'true'
    },
    memoryVisble: {
      string: '回忆长廊他人是否可见',
      checked: 'true'
    }
  },
  ChangeProfileVisble: function(e) {
    this.data.profileVisble.checked = !this.data.profileVisble.checked
    console.log(this.data.profileVisble.checked)
  },
  ChangeMemoryVisble: function(e) {
    this.data.memoryVisble.checked = !this.data.memoryVisble.checked
    console.log(this.data.memoryVisble.checked)
  },
  //确认修改
  ConfirmChange: function(e){
  //写入数据库
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
  //输入简介
  InputBriefIntro: function (e) {
    this.setData({
      briefIntro: e.detail.value
    })
  }
})