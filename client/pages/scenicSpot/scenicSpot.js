// pages/place/place.js
var config = require('../../config')
var util = require('../../utils/util.js')
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var app = getApp()
const GOOD = 1
const BAD = 2
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: ["../../image/noImage.png", "../../image/noImage.png"],
    introduction: "这个景点还没有介绍哦",
    placeName: "景点名",

    commentList:[
      // {
        // `id`				INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '评论ID',
        // `icon_url` 			VARCHAR(255) 	NOT NULL			COMMENT '头像url',
        // `user_id` 			VARCHAR(100) 	NOT NULL 	COMMENT '评论用户open_id',
        // `content` 			VARCHAR(255) 	NOT NULL 	COMMENT '内容',
        // `scenic_spot_id` 	VARCHAR(10) 	NOT NULL 	COMMENT '景点id',
        // `evaluation` 		TINYINT 		NOT NULL 	COMMENT '评价（好评为1，差评为2)',
        // `agree` 			INT UNSIGNED DEFAULT 0 		COMMENT '好评量',
        // `disagree` 			INT UNSIGNED DEFAULT 0 		COMMENT '差评量',
        // `timestamp`			timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '评论时间',
        // `type`   0没选择，1喜欢，2不喜欢
      // },`
    ],
  
    goodReputationUrl:"../../image/goodReputation.png",
    badReputationUrl: "../../image/badReputation.png",
    likeUrl: "../../image/like.png",
    dislikeUrl: "../../image/dislike.png",
    unselectLikeUrl: "../../image/unselectLike.png",
    unselectDisLikeUrl: "../../image/unselectDislike.png",


    tabs: ["评论", "攻略"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    articleList: [

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
  UpdateLike: function (commentId,type) {
    console.log(type)
    qcloud.request({
      url: config.service.updateSceneCommentLikeUrl,
      login: true,
      data: {
        commentType: type,
        scenic_spot_id: app.globalData.naviPlaceId,
        userId: app.globalData.userInfo.openId,
        comment_id: commentId
      },
      success(result) {
        util.showSuccess("点赞成功");
        console.log('点赞成功', result)
      },
      fail(error) {
        util.showModel('点赞失败', error)
        console.log('点赞失败', error)
      }
    })
  },

  TapLike: function (params) {
    if(!app.globalData.logged)
    {
      util.showModel("点赞失败","要登录才能点赞")
      return
    }

    var i = params.currentTarget.dataset.index
    var tmpdisagree = this.data.commentList[i].disagree
    var tmpagree = this.data.commentList[i].agree
    console.log(this.data.commentList[i].type)
    if (!this.data.commentList[i].type)
    {
      this.data.commentList[i].type = 1
      tmpagree++;
    }
    else if ( this.data.commentList[i].type == 1)
    {
      this.data.commentList[i].type = 0
      tmpagree--;
    }
    else if (this.data.commentList[i].type == 2)
    {
      this.data.commentList[i].type = 1
      tmpagree++;
      tmpdisagree--;
    }
    else if(this.data.commentList[i].type == 0)
    {
      console.log("HIhihi")
      this.data.commentList[i].type = 1
      tmpagree++;
    }

    this.data.commentList[i].disagree = tmpdisagree;
    this.data.commentList[i].agree = tmpagree;
    var tmpList = this.data.commentList
    this.setData({ commentList: tmpList })
    this.UpdateLike(this.data.commentList[i].id, this.data.commentList[i].type)
  },
  TapDisLike: function (params) {
    if (!app.globalData.logged) {
      util.showModel("点赞失败", "要登录才能点赞")
      return
    }
    var i = params.currentTarget.dataset.index
    var tmpdisagree = this.data.commentList[i].disagree
    var tmpagree = this.data.commentList[i].agree
    if (!this.data.commentList[i].type)
    {
      this.data.commentList[i].type = 2;
      tmpdisagree++;
    }
    else if (this.data.commentList[i].type == 2)
    {
      this.data.commentList[i].type = 0;
      tmpdisagree--;
    }
    else if (this.data.commentList[i].type == 1)
    {
      this.data.commentList[i].type = 2
      tmpdisagree++;
      tmpagree--;
    }
    else if (this.data.commentList[i].type == 0)
    {
      this.data.commentList[i].type = 2
      tmpdisagree++;
    }
    this.data.commentList[i].disagree = tmpdisagree;
    this.data.commentList[i].agree = tmpagree;
    var tmpList = this.data.commentList
    this.setData({ 
      commentList: tmpList,
    })
    this.UpdateLike(this.data.commentList[i].id, this.data.commentList[i].type)
  },
  LoadCommentLike:function () {
    if(!app.globalData.logged)
      return
    var that = this
    qcloud.request({
      url: config.service.querySceneCommentLikeUrl,
      login: true,
      data: {
        scenic_spot_id: app.globalData.naviPlaceId,
        userId: app.globalData.userInfo.openId,
      },
      success(result) {
        var list = result.data.data
        for (let i = 0; i < that.data.commentList.length; i++) {
          for(let j = 0; j < list.length; j++){
            if (list[j].comment_id == that.data.commentList[i].id){
              that.data.commentList[i].type = list[j].type
              break
            }
          }
        }
        var tmp = that.data.commentList
        that.setData({commentList:tmp})
        console.log('读取点赞信息成功', result)
      },
      fail(error) {
        console.log('读取点赞信息失败', error)
      }
    })
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
        userId: app.globalData.userInfo.openId,
        avatarUrl:app.globalData.userInfo.avatarUrl,
        userName: app.globalData.userInfo.nickName,
        scenicSpotName:this.data.placeName
      },
      success(result) {
        util.showSuccess("评论成功");
        console.log('评论成功', result)
      },
      fail(error) {
        util.showModel('评论失败', error)
        console.log('评论失败', error)
      }
    })
    that.setData({ hiddenmodalput: true });
  },
  SubmitCancel:function(){
    this.setData({ hiddenmodalput: true });
  },
  LoadComment: function() {
    util.showBusy('请求评论中...')
    var that = this
    var options = {
      url: config.service.queryScenicSpotCommentUrl,
      data: {
        scenicSpotId: app.globalData.naviPlaceId
      },
      success(result) {
          that.setData({
            commentList:result.data.data
          })
          that.LoadCommentLike()
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
      app.globalData.tmpScenicSpotData = null;
    }
    else
      this.RequestScenicSpotData();
    this.LoadComment();
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
          console.log(that.data.imgUrls)
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
  },

  WriteArticle:function(e){
    app.globalData.naviPlaceName = this.data.placeName;
    wx.navigateTo({
      url: '../writeArticle/writeArticle',
    })
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
})