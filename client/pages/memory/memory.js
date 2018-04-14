Page({

  /**
   * 页面的初始数据
   */
  data: {
    addMemoryImage : "../../image/addMemoryBtn.png",
    
    memoryList: [
      {
        imgUrl: "../../image/IMG_20140711_201049.jpg",
        content: "这这这这",
        time:"2018.1.1"
      },
      {
        imgUrl: "../../image/IMG_20140713_075457.jpg",
        content: "这这这这",
        time:"2018.1.1"
      },
    ],
  },

  navigateToAddMemory: function(e){
    wx.navigateTo({
      url: '../addMemory/addMemory',
    })
  },

  // 预览图片
  previewImg: function (e) {
    var index = e.currentTarget.dataset.index;
    wx.previewImage({
        urls: [this.data.memoryList[index].imgUrl]
    })
    
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