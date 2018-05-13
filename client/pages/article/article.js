var app = getApp()

Page({
  data: {
    article: [
      //text:"",
      //imgUrl:"",
    ],
  },

  onLoad: function (options) {
    var article = [
      {
        text: "        这是一篇攻略哦        这个空格可以吗",
        imgUrl: "../../image/图标.png",
      },
      {
        text: "       正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文",
        imgUrl: "../../image/loading.png",
      },
      {
        text: "    结尾一下好了。",
        imgUrl: "",
      },
    ]
    this.setData({
      article: article
    })
  },


})