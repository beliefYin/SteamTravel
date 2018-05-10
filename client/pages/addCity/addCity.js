//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
    data: {
        cityId: 0,
        introduction: "",
        placeName: "",
        briefIntro: "",
        briefImgUrl: "../../image/noImage.png",
        tempFilePaths: [],
        currentUploadIndex:0,
        imgUrl:''
    },
  

    InputCityName: function (event) {
        this.data.placeName = event.detail.value;
    },

    InputCityId: function (event) {
        this.data.cityId = event.detail.value;
    },

    InputCityIntro: function (event) {
        this.data.introduction = event.detail.value;
    },

    InputCityBriefIntro: function (event) {
        this.data.briefIntro = event.detail.value;
    },

    Affirm: function () {
           
        if (!isRealNum(this.data.cityId))
        {
            util.showModel("错误","城市id必须为不为0的整数")
            return;
        }
        if (this.data.imgUrls == '' ||this.data.introduction == "" || this.data.placeName == "" || this.data.briefIntro == "" )
        {
            util.showModel("错误", "还有没有填的位置")
            return;
        }
        util.showBusy('请求中...')
        var that = this;

        var options = {
            url: config.service.addCityUrl,


            data:{
                cityId: this.data.cityId,
                placeName: this.data.placeName,
                introduction: this.data.introduction,
                briefIntro: this.data.briefIntro,
                briefImgUrl: this.data.briefImgUrl,
                imgUrlStr:this.data.imgUrl
            },
            success(result) {
                if(result.data.code == 1)
                    util.showSuccess('更新数据成功');
                else
                    util.showSuccess('添加成功');
                console.log('添加成功', result);
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
    UploadImg: function () {
        var that = this;
        var showStr = '(' + (this.data.currentUploadIndex + 1) + '/' + this.data.tempFilePaths.length + ')';
        util.showBusy(showStr);
        //上传图片
        wx.uploadFile({
            url: config.service.uploadUrl,
            filePath: this.data.tempFilePaths[this.data.currentUploadIndex],
            name: 'file',

            success: function(res){
                
            },

            fail: function(e) {
                util.showModel('上传图片失败')
            },
            complete:function(res){
                res = JSON.parse(res.data)
                console.log('上传图片',res)
                if (that.data.imgUrl != '')
                    that.data.imgUrl = that.data.imgUrl + ';'
                that.data.imgUrl = that.data.imgUrl + res.data.imgUrl
                that.data.currentUploadIndex++
                if (that.data.currentUploadIndex < that.data.tempFilePaths.length)
                    that.UploadImg()
                console.log("imgString:", that.data.imgUrl)
            }
        })
    },
    // 上传图片接口
    doUpload: function () {
        var that = this

        // 选择图片
        wx.chooseImage({
            count: 4,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: function(res){
                that.data.tempFilePaths = res.tempFilePaths;
                that.data.currentUploadIndex = 0;
                that.UploadImg();
                
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
