var app = getApp()
var MaxPictureCount = 4
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    title:'',
    article:[
      {
        text: "",
        imgUrl: "",
      }
    ],
    curPicutreCount: 0,
    canAddPic: true,

    author:'',
    currentUploadIndex: 0,
    mainbody:'',
    imgUrl:'',
    placeName:'',

    isPerson: true
  },

  InputTitle: function (event) {
    this.data.title = event.detail.value;
  },
  InputMainbody: function (event) {
    var i = event.target.dataset.index
    this.data.article[i].text = event.detail.value;
  },
  IsCanAddPic: function () {
    if(this.data.curPicutreCount >= MaxPictureCount)
    {
      this.setData({ canAddPic:false})

    }
  },
  AddPic: function (event){
    var that = this

    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var i = event.target.dataset.index
        that.data.article[i].imgUrl = res.tempFilePaths[0];
        that.data.currentUploadIndex = 0;
        var curPicutreCount = that.data.curPicutreCount + 1
        var tmp = {
          text: '',
          imgUrl: ''
        }
        that.data.article.push(tmp)
        tmp = that.data.article
        that.setData({
          article: tmp,
          curPicutreCount: curPicutreCount
        })
        that.IsCanAddPic()
      },
      fail: function (e) {
        console.error(e)
      }
    })
    
   
  },
  PackData: function (){
    for (let index = 0; index < this.data.article.length; index++) {
      const element = this.data.article[index];
      if(element.text == '')
        this.data.article[index].text = "###"
      if (element.imgUrl == '')
        this.data.article[index].imgUrl = "###"
      if(index != 0)
      {
        this.data.mainbody = this.data.mainbody + '&&&'
        this.data.imgUrl = this.data.imgUrl + '&&&'     
      }
      this.data.mainbody = this.data.mainbody + this.data.article[index].text
      this.data.imgUrl = this.data.imgUrl + this.data.article[index].imgUrl
    }
  },
  Submit: function (){
    if (!app.globalData.logged) {
      util.showModel("提交失败", "要登录才能提交文字")
      return
    }
    if (this.data.title == '') {
      util.showModel('错误', '请输入标题')
      return
    }
    if (this.data.article[0].txt == '') {
      util.showModel('错误', '请输入正文')
      return
    }
    wx.showToast({
      title: "上传中",
      icon: 'loading',
    })
    this.UploadImg()
  },
  DoUpload: function(){
    var that = this;
    this.PackData()
    qcloud.request({
      url: config.service.AddArticleUrl,
      login: true,
      data: {
        mainbody: this.data.mainbody,
        imgUrl: this.data.imgUrl,
        author: app.globalData.userInfo.nickName,
        uesrId: app.globalData.userInfo.openId,
        placeId: app.globalData.naviPlaceId,
        title: this.data.title
      },
      success(res) {
        console.log("添加文章成功", res);
      },
      fail(error) {
        console.log("添加文章失败", error)
      }
    });
    util.showSuccess("上传完成")
  },
  onLoad: function (options) {
    var isPerson = true;
    if(app.globalData.naviPlaceId == 0)
      isPerson = true;
    else
      isPerson = false;
    this.setData({
      placeName:app.globalData.naviPlaceName,
      isPerson:isPerson
    }) 
  },
  UploadImg: function () {
    var that = this;
    if (this.data.currentUploadIndex >= this.data.article.length)
    {
      this.DoUpload();
      return;
    }
    if (this.data.article[this.data.currentUploadIndex].imgUrl == '')
    {
      this.data.currentUploadIndex++;
      this.UploadImg();
      return
    }

    //上传图片
    wx.uploadFile({
      url: config.service.uploadUrl,
      filePath: this.data.article[this.data.currentUploadIndex].imgUrl,
      name: 'file',

      success: function (res) {

      },

      fail: function (e) {
        util.showModel('上传图片失败')
      },
      complete: function (res) {
        res = JSON.parse(res.data)
        console.log('上传图片', res)
        that.data.article[that.data.currentUploadIndex].imgUrl = res.data.imgUrl
        that.data.currentUploadIndex++
        that.UploadImg()
        console.log("imgString:", that.data.imgUrl)
      }
    })
  },

})