//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('./utils/util.js')

App({
    globalData: {
      userInfo: null,
      code: null,
      isLoginSuc: false,
      placeUrl: null,
      logged:false,
      naviPlaceId: 0,
      naviPlaceName:"还没做",//用来写攻略
      articleId:0,

      memoryVisible: 1,
      infoVisible:1,
      hasChangedUserInfo: true,

      tmpCityData: null,
      tmpScenicSpotData: null,
      isRefreshMemory: true,
      otherUserId:0,
    },
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
        //this.login()
    },
    // 用户登录示例
    login: function () {
      if (this.globalData.logged) return

      var that = this
      // 调用登录接口
      qcloud.login({
        success() {
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              console.log("登陆请求成功",result)
              that.globalData.userInfo = result.data.data;
              that.globalData.logged = true;
              qcloud.request({
                url: config.service.addUserUrl,
                data: {
                  openId:that.globalData.userInfo.openId,
                  userName:that.globalData.userInfo.nickName,
                  avatarUrl:that.globalData.userInfo.avatarUrl,
                },
                success(result) {
                  console.log('添加用户成功', result)
                },
                fail(error) {
                  console.log('添加用户失败', error)
                }
              })
            },

            fail(error) {
              util.showModel('登陆请求失败', error)
              console.log('登陆请求失败', error)
            }
          })
        },

        fail(error) {
          util.showModel('登录失败', error)
          console.log('登录失败', error)
        }
      })
    },
})