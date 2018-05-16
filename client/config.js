/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://674118031.steamtravel.xyz'//'https://674118031.steamtravel.xyz';   'https://5pewu2mx.qcloud.la'

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,

        // 推介列表
        recommendationUrl: `${host}/weapp/QueryRecommendation`,
        addRecommendationUrl: `${host}/weapp/AddRecommendation`,

        addCityUrl: `${host}/weapp/AddCity`,

        addScenicSpotUrl: `${host}/weapp/AddScenicSpot`,

        queryScenicSpotUrl: `${host}/weapp/QueryScenicSpot`,
        queryScenicSpotACity: `${host}/weapp/QueryScenicSpotACity`,
        getPlaceTypenUrl: `${host}/weapp/GetPlaceTypenUrl`,
        queryCityUrl: `${host}/weapp/QueryCityData`,
        addUserUrl: `${host}/weapp/AddUser`,


        addCommentUrl: `${host}/weapp/AddComment`,
        queryScenicSpotCommentUrl: `${host}/weapp/QueryScenicSpotComment`,
        queryUserCommentUrl: `${host}/weapp/QueryUserComment`,
        querySelfMemoryUrl: `${host}/weapp/QuerySelfMemory`,
        queryOtherMemoryUrl: `${host} / weapp /QueryOtherMemory`,
        addMemoryUrl:`${host}/weapp/AddMemory`,
        querySceneCommentLikeUrl: `${host}/weapp/QuerySceneCommentLike`,
        updateSceneCommentLikeUrl: `${host}/weapp/UpdateSceneCommentLike`,

        AddArticleUrl: `${host}/weapp/AddArticle`,
        QuerySceneArticleUrl: `${host}/weapp/QuerySceneArticle`,
        QueryUserArticleUrl: `${host}/weapp/QueryUserArticle`,
        QueryArticleUrl: `${host}/weapp/QueryArticle`,
        
    }
};

module.exports = config;
