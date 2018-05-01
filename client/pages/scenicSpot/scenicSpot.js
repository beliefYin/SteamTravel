// pages/place/place.js
var config = require('../../config')
var util = require('../../utils/util.js')
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var app = getApp()
const GOOD = 1
const BAD = 2

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: true,
    imgUrls: ["../../image/广州1.png", "../../image/广州2.png"],
    introduction: "这个景点还没有介绍哦",
    placeName: "北固山",

    commentList:[
      {
        name:"simon",
        picUrl:"../../user-unlogin.png",
        attitude:GOOD,//好评或差评
        agreeNum:100,
        disagreeNum:23,
      },
      {
        name:"simon",
        picUrl:"../../user-unlogin.png",
        attitude:BAD,//好评或差评
        agreeNum:10,
        disagreeNum:23,
      },
    ],
    //---------写评论--------
    hiddenmodalput:true,
    commentType:[
      {
        str:"好评",
        checked:true,
        value:1
      },
      {
        str: "差评",
        value: 2
      }
    ],
    isLike:1,
    commentContent:"",
    //-----------------------
  },
  ShowWriteCommentModal:function(){
    this.setData({hiddenmodalput:false});
  },
  CommentTypeChange:function(e){
    this.data.isLike = e.detail.value;
  },
  InputComment: function (event){
    this.data.commentContent = event.detail.value;
  },
  SubmitComment:function(){
    var that = this
    if (this.data.commentContext == "")
    {
      util.showModel("提交失败","请写下你的评论");
      return;
    }
    if(!app.globalData.logged)
    {
      util.showModel("提交失败", "需要登录才能评论");
      return;
    }
    qcloud.request({
      url: config.service.addCommentUrl,
      login: true,
      data:{
        content:this.data.commentContent,
        type:this.data.isLike,
        scenicSpotId: app.globalData.naviPlaceId,
        userId: app.globalData.userInfo.openId
      },
      success(result) {
        that.setData({ hiddenmodalput: true });
        util.showSuccess("评论成功");
        console.log('评论成功', result)
      },
      fail(error) {
        util.showModel('评论失败', error)
        console.log('评论失败', error)
      }
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.tmpScenicSpotData)
    {
      var resData = app.globalData.tmpScenicSpotData
      var imgUrlStr = resData.pic_url
      var tmpImgUrl = imgUrlStr.split(';')
      this.setData({
          placeName: resData.scenic_spot_name,
          introduction: resData.introduction,
          imgUrls: tmpImgUrl
      })
      //app.globalData.tmpScenicSpotData = null;
    }
    else
      this.RequestScenicSpotData();
  },
  
  RequestScenicSpotData:function ()
  {
    util.showBusy('请求中...')
    var that = this
    var options = {
      url: config.service.queryScenicSpotUrl,
      data: {
        scenicSpotId: app.globalData.naviPlaceId
      },
      success(result) {
        if (result.data.code == 1) {
          util.showModel('请求出错', '还没收录这个地方');
          return;
        }
        else {
          var resData = result.data.data[0]
          var imgUrlStr = resData.pic_url
          var tmpImgUrl = imgUrlStr.split(';')
          that.setData({
            placeName: resData.scenic_spot_name,
            introduction: resData.introduction,
            imgUrls: tmpImgUrl
          })
          util.showSuccess('请求成功');
          console.log('请求景点信息成功', result)
        }

      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    }
    wx.request(options);
  }
})