var config = require('../../config')
var util = require('../../utils/util.js')
var qcloud = require('../../vendor/wafer2-client-sdk/index')

var app = getApp()

Page({
    data:{
        imgUrl: "../../image/addMemoryBtn.png",
        description : "",
        visble:1,//1为可见，0为不可见
    },
    uploadImage:function(){
        var that = this

        // 选择图片
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: function(res){
                util.showBusy('正在上传')
                var filePath = res.tempFilePaths[0]

                // 上传图片
                wx.uploadFile({
                    url: config.service.uploadUrl,
                    filePath: filePath,
                    name: 'file',

                    success: function(res){
                        util.showSuccess('上传图片成功')
                        console.log(res)
                        res = JSON.parse(res.data)
                        console.log(res)
                        that.setData({
                            imgUrl: res.data.imgUrl
                        })
                    },

                    fail: function(e) {
                        util.showModel('上传图片失败')
                    }
                })

            },
            fail: function(e) {
                console.error(e)
            }
        })
    },
    InputDescription:function(e) {
        this.data.description = e.detail.value
    },
    ChangeVisble:function(){
        if (this.data.visble == 1)
            this.data.visble = 0;
        else
            this.data.visble = 1;
    },
    //确认修改
    ConfirmChange:function(){
        var that = this;
        qcloud.request({
            url: config.service.addMemoryUrl,
            login: true,
            data: {
                userId: app.globalData.userInfo.openId,
                imgUrl: this.data.imgUrl,
                visble: this.data.visble,
                description: this.data.description
            },
            success(res) {
                app.globalData.isRefreshMemory = true
                wx.navigateBack({
                    delta: 1, // 回退前 delta(默认为1) 页面
                })
                console.log("AddMemory success", res);
            },
            fail(error) {
                console.log("AddMemory fail", error)
            }
        });
    },

    onShareAppMessage: function() {
        // 用户点击右上角分享
        return {
          title: 'title', // 分享标题
          desc: 'desc', // 分享描述
          path: 'path' // 分享路径
        }
    }
})