//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
    data: {
        imgUrls: [
            "../../image/noImage.png",
            "../../image/noImage.png",
        ],
        belongCityId: 0,
        introduction: "",
        placeName: "",
        briefIntro: "",
        briefImgUrl: "../../image/noImage.png"
    },
    InputName: function (event) {
        this.data.placeName = event.detail.value;
    },
    InputBelongCityId: function (event) {
        this.data.belongCityId = event.detail.value;
    },
    InputIntro: function (event) {
        this.data.introduction = event.detail.value;
    },
    InputBriefIntro: function (event) {
        this.data.briefIntro = event.detail.value;
    },
    Affirm: function () {
        if ( !isRealNum(this.data.belongCityId))
        {
            util.showModel("错误","id必须为不为0的整数")
            return;
        }
        if (this.data.imgUrls.length == 0 ||this.data.introduction == "" || this.data.placeName == "" || this.data.briefIntro == "" )
        {
            util.showModel("错误", "还有没有填的位置")
            return;
        }
        util.showBusy('请求中...')
        var that = this;
        var imgUrlStr = this.data.imgUrls[0];
        for (let index = 1; index < this.data.imgUrls.length; index++) {
            const element = this.data.imgUrls[index];
            imgUrlStr += ";"
            imgUrlStr += element
        }
        var options = {
            url: config.service.addScenicSpotUrl,

            data:{
                belongCityId: this.data.belongCityId,
                placeName: this.data.placeName,
                introduction: this.data.introduction,
                briefIntro: this.data.briefIntro,
                briefImgUrl: this.data.briefImgUrl,
                imgUrlStr:imgUrlStr,
            },
            success(result) {
                if(result.data.code == 1)
                    util.showSuccess('添加成功');
                else if (result.data.code == 2)
                    util.showSuccess('更新成功');
                else if(result.data.code == -1)
                    util.showModel('添加失败', '不存在这个城市ID');
                console.log(result)
            },
            fail(error) {
                util.showModel('添加失败', error);
                console.log('添加失败', error);
            }
        }
        wx.request(options);

        function isRealNum(val) {
            if (val === "" || val == null || val == 0) {
                return false;
            }
            if (!isNaN(val)) {
                return true;
            } else {
                return false;
            }
        }
    },
    // 上传图片接口
    doUpload: function () {
        var that = this

        // 选择图片
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: function(res){
                util.showBusy('正在上传')
                var filePath = res.tempFilePaths[0]
                console.log(filePath)
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

    // 预览图片
    previewImg: function () {
        wx.previewImage({
            current: this.data.imgUrl,
            urls: [this.data.imgUrl]
        })
    },
})
