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

      memoryVisible: 1,
      infoVisible:1,
      hasChangedUserInfo: true
    },
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
        //this.login()
    },
    // 用户登录示例
    login: function () {
      if (this.globalData.logged) return

      util.showBusy('正在登录')
      var that = this
      // 调用登录接口
      qcloud.login({
        success(result) {
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              util.showSuccess('登录成功');
              that.globalData.userInfo = result.data.data;
              that.globalData.logged = true;
              
            },

            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
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