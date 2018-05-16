const { mysql } = require('../qcloud')

async function AddUser(ctx, next) {
    const { openId, userName,avatarUrl} = ctx.query
    var res = await mysql("user_info").select('*').where({ open_id: openId })
    if(res.length != 0)
    {
       // ctx.state.data = res
        ctx.state.code = 1
        return;
        
    }

    var userData = {
        open_id: openId,
        user_name: userName,
        introduction: "还没有简介",
        icon_url:avatarUrl
    }
    
    res = await mysql("user_info").insert(userData)
    ctx.state.data = res
    // ctx.state.data = {
    //     openid: openId,
    //     userName: userName,
    //     introduction: "还没有简介"
    // }
}

async function QueryUser(ctx, next) {
    const { openId} = ctx.query
    var userData = {
        open_id: openId,
    }
    var res = await mysql("user_info").select('*').where({ open_id: openId })
    
    if (res.length == 0)
        ctx.state.code = 1
    else
        ctx.state.data = res
}

async function UpdateUser(ctx, next) {
    const { openId, sex, introduction,infoVisible,memoryVisible } = ctx.query
    var res = await mysql("user_info").select('*').where({ open_id: openId })

    if(res.length == 0)
        return;

    var userData = {
        sex:sex,
        introduction: introduction,
        info_visible:infoVisible,
        memory_visible:memoryVisible
    }
    res = await mysql("user_info").update(userData).where({ open_id:openId })
    ctx.state.data = res
    // ctx.state.data = {
    //     openid: openId,
    //     sex: sex,
    //     introduction: "还没有简介",
    //     infoVisible: infoVisible,
    //     memoryVisible: memoryVisible
    // }
    
}

async function QueryRecommendation(ctx, next) {
    var res = await mysql("recommendation").select('*')

    if (res.length == 0)
    {
        ctx.state.data = res
        ctx.state.code = 1;        
        return;
    }
    var cityIdList = [];
    var scenicSpotIdList = [];
    for (let index = 0; index < res.length; index++) {
        if(res[index].type == 0)
            cityIdList.push(res[index].id)
        else
            scenicSpotIdList.push(res[index].id)
    }
    var sucResult = {}
    sucResult.city = await mysql("city").select('*').whereIn('city_id', cityIdList);
    sucResult.scenicSpot = await mysql("scenic_spot").select('*').whereIn('scenic_spot_id', scenicSpotIdList);

    ctx.state.data = sucResult
}

async function AddCity(ctx, next) {
    const { imgUrlStr, cityId, introduction, placeName, briefIntro, briefImgUrl  } = ctx.query
    var res = await mysql("city").select('*').where({city_id:cityId})
    if (res.length != 0) {
        var updateCityData = {
            city_name: placeName,
            introduction: introduction,
            brief_introduction: briefIntro,
            brief_pic_url: briefImgUrl,
            pic_url: imgUrlStr
        }
        res = await mysql("city").update(updateCityData).where({ city_id: cityId })
        ctx.state.code = 1;
        return;
    }
    var cityData = {
        city_id: cityId ,
        city_name: placeName ,
        introduction: introduction,
        brief_introduction: briefIntro ,
        brief_pic_url: briefImgUrl,
        pic_url: imgUrlStr
    }

    res = await mysql("city").insert(cityData);
    
    ctx.state.data = res
}

async function AddScenicSpot(ctx, next) {
    const { imgUrlStr, belongCityId, introduction, placeName, briefIntro, briefImgUrl, type } = ctx.query
    var belongCity = await mysql("city").select('*').where({ city_id: belongCityId });
    var res = null;
    if (belongCity.length == 0)
    {
        ctx.state.code = -1;
        ctx.state.data = belongCity;
        return;
    }

    res = await mysql("scenic_spot").select('*').where({ scenic_spot_name: placeName, belong_city_id: belongCityId })
    if (res.length != 0){
        var updateScenicSpotData = {
            belong_city_id: belongCityId,
            scenic_spot_name: placeName,
            introduction: introduction,
            brief_introduction: briefIntro,
            brief_pic_url: briefImgUrl,
            pic_url: imgUrlStr
        }
        var id = res[0].scenic_spot_id;
        res = await mysql("scenic_spot").update(updateScenicSpotData).where({ scenic_spot_id: id })
        ctx.state.code = 2;
        ctx.state.data = res;
        return;
    }
    else{
        var scenicSpotId = belongCityId * 1000 + belongCity[0].next_scenic_spot_id;
        var nextScenicSpotId = belongCity[0].next_scenic_spot_id + 1;
        var scenicSpotData = {
            scenic_spot_id: scenicSpotId,
            belong_city_id: belongCityId,
            scenic_spot_name: placeName,
            introduction: introduction,
            brief_introduction: briefIntro,
            brief_pic_url: briefImgUrl,
            pic_url: imgUrlStr
        }
        var updateCityRes = await mysql("city").update({ next_scenic_spot_id: nextScenicSpotId }).where({ city_id: belongCityId });
        res = await mysql("scenic_spot").insert(scenicSpotData);
        ctx.state.code = 1
        ctx.state.data = updateCityRes
    }

}

async function QueryScenicSpot(ctx, next) {
    const { scenicSpotId } = ctx.query

    var res = await mysql("scenic_spot").select('*').where({ scenic_spot_id: scenicSpotId })

    if (res.length == 0)
        ctx.state.code = 1
    else
        ctx.state.data = res
}

async function GetPlaceTypenUrl(ctx, next) {
    const { name } = ctx.query

    var res = await mysql("scenic_spot").select('*').where({ scenic_spot_name: name })

    if (res.length != 0)
    {
        ctx.state.code = 1  //1为景点
        ctx.state.data = res
        return
    }
    res = await mysql("city").select('*').where({ city_name: name })
    if(res.length != 0)
    {
        ctx.state.code = 2  //2为城市
        ctx.state.data = res
        return
    }
    else
    {
        ctx.state.code = 0
        ctx.state.data = res
        return
    }
}

async function QueryCityData(ctx, next) {
    const { cityId } = ctx.query

    var res = await mysql("city").select('*').where({ city_id: cityId })

    if (res.length == 0)
        ctx.state.code = 1
    else
        ctx.state.data = res
}

async function QueryCityData(ctx, next) {
    const { cityId } = ctx.query

    var res = await mysql("city").select('*').where({ city_id: cityId })

    if (res.length == 0)
        ctx.state.code = 1
    else
        ctx.state.data = res
}

async function AddComment(ctx, next) {
    const { content, type, scenicSpotId, userId,avatarUrl,userName,scenicSpotName} = ctx.query
    var comment = {
        user_id:userId,
        content: content,
        scenic_spot_id: scenicSpotId,
        evaluation: type,
        icon_url: avatarUrl,
        user_name: userName,
        scenic_spot_name:scenicSpotName
    }
    var res = await mysql("scene_comment").insert(comment);
    ctx.state.data = res
}

async function QueryScenicSpotComment(ctx, next) {
    const { scenicSpotId} = ctx.query
    var res = await mysql("scene_comment").select('*').where({scenic_spot_id:scenicSpotId});
    ctx.state.data = res
}
async function QueryUserComment(ctx, next) {
    const { userId} = ctx.query
    var res = await mysql("scene_comment").select('id','icon_url', 'content', 'evaluation', 'agree', 'disagree', 'timestamp', 'scenic_spot_name').where({user_id:userId});
    ctx.state.data = res
}
async function AddRecommendation(ctx, next) {
    const { name } = ctx.query;
    var res = await mysql("scenic_spot").select('*').where({ scenic_spot_name: name})
    if (res.length == 0)
    {
        ctx.state.data = res;
        ctx.state.code = -1;
        return;
    }
    var data = { id: res[0].scenic_spot_id, type: 1 };
    res = await mysql("recommendation").insert(data);
    ctx.state.data = res
}

async function QueryScenicSpotACity(ctx, next) {
    const { cityId } = ctx.query;
    var res = await mysql("scenic_spot").select('brief_pic_url', 'scenic_spot_name', 'brief_introduction','scenic_spot_id').where({ belong_city_id: cityId })
    ctx.state.data = res
}

async function QuerySelfMemory(ctx, next) {
    const { userId } = ctx.query;
    var res = await mysql("memory_gallery").select('*').where({ user_id: userId })
    ctx.state.data = res
}

async function QueryOtherMemory(ctx, next) {
    const { userId } = ctx.query;
    var res = await mysql("user_info").select('memory_visible').where({ open_id: userId })
    if (res[0].memory_visible == 0)//不可见
    {
        ctx.state.data = res
        ctx.state.code = -1        
        return 
    }
    res = await mysql("memory_gallery").select('pic_url', 'memory_visible', 'like', 'timestamp','content').where({ memory_visible: 1, user_id: userId })
      
}

async function AddMemory(ctx, next) {
    const { userId, imgUrl, visble, description } = ctx.query;
    var memory = {
        user_id: userId,
        pic_url: imgUrl,
        memory_visible: visble,
        content: description
    }
    var res = await mysql("memory_gallery").insert(memory);
    ctx.state.data = res
}

async function QuerySceneCommentLike(ctx, next) {
    const { userId, scenic_spot_id } = ctx.query;
    var res = await mysql("scene_comment_like").select('comment_id', 'type').where({ user_id: userId, scenic_spot_id: scenic_spot_id});
    ctx.state.data = res
}

async function UpdateSceneCommentLike(ctx, next) {
    const { userId, scenic_spot_id, commentType, comment_id } = ctx.query;

    var oldCommentLike = await mysql("scene_comment_like").select('id', 'comment_id', 'type').where({ user_id: userId, comment_id: comment_id });
    var res = await mysql("scene_comment").select('agree', 'disagree').where({ id: comment_id });
    if (oldCommentLike.length == 0)
    {   //新增
        var insertRes = await mysql("scene_comment_like").insert({ scenic_spot_id: scenic_spot_id, comment_id: comment_id, user_id: userId, type: commentType })
        var updateRes
        if (commentType == 1)
        {
            var agreeNum = res[0].agree + 1
            updateRes =await mysql("scene_comment").update({ agree: agreeNum }).where({ id: comment_id })
        }
        else if (commentType == 2)
        {
            var disagreeNum = res[0].disagree + 1
            updateRes =await mysql("scene_comment").update({ disagree: disagreeNum }).where({ id: comment_id })
        }
        var result = {}
        result.updateRes = updateRes
        result.res = res
        result.insertRes = insertRes
        ctx.state.data = result
        ctx.state.code = 1
        return
    }
    else
    {   //修改
        await mysql("scene_comment_like").update({ type: commentType }).where({ id: oldCommentLike[0].id })
        if (oldCommentLike[0].type == 0 && commentType == 1){   //无评变好评
            var agreeNum = res[0].agree + 1
            await mysql("scene_comment").update({ agree: agreeNum }).where({ id: comment_id })
        }
        else if (oldCommentLike[0].type == 0 && commentType == 2){   //无评变差评
            var disagreeNum = res[0].disagree + 1
            await mysql("scene_comment").update({ disagree: disagreeNum }).where({ id: comment_id })
        }
        else if (oldCommentLike[0].type == 1 && commentType == 0) {   //好评变无评
            var agreeNum = res[0].agree - 1
            await mysql("scene_comment").update({ agree: agreeNum }).where({ id: comment_id })
        }
        else if (oldCommentLike[0].type == 1 && commentType == 2) {   //好评变差评
            var agreeNum = res[0].agree - 1
            var disagreeNum = res[0].disagree + 1
            await mysql("scene_comment").update({ agree: agreeNum, disagree: disagreeNum }).where({ id: comment_id })
        }
        else if (oldCommentLike[0].type == 2 && commentType == 0) {   //差评变无评
            var disagreeNum = res[0].disagree - 1
            await mysql("scene_comment").update({ disagree: disagreeNum }).where({ id: comment_id })
        }
        else if (oldCommentLike[0].type == 2 && commentType == 1) {   //差评变好评
            var agreeNum = res[0].agree + 1
            var disagreeNum = res[0].disagree - 1
            await mysql("scene_comment").update({ agree: agreeNum, disagree: disagreeNum }).where({ id: comment_id })
        }
        ctx.state.data = oldCommentLike
        ctx.state.code = 2
        return
    }

}

async function AddArticle(ctx, next) {
    const { mainbody, imgUrl, author, uesrId, sceneName, placeId, title } = ctx.query;
    var data = {
        mainbody:mainbody,
        pic_url:imgUrl, 
        author:author,
        user_id:uesrId, 
        belong_scene_id:placeId,
        title:title
    }
    res = await mysql("article").insert(data)
    ctx.state.data = res
}

async function QuerySceneArticle(ctx, next) {
    const { sceneId } = ctx.query;

    res = await mysql("article").select('id','title').where({ belong_scene_id: sceneId })
    ctx.state.data = res
}

async function QueryUserArticle(ctx, next) {
    const { uesrId } = ctx.query;

    res = await mysql("article").select('*').where({ user_id: uesrId })
    ctx.state.data = res
}

async function QueryArticle(ctx, next) {
    const { id } = ctx.query;

    res = await mysql("article").select('*').where({ id: id })
    ctx.state.data = res
}


module.exports = {
    AddUser,
    QueryUser,
    UpdateUser,
    QueryRecommendation,
    AddCity,
    AddScenicSpot,
    QueryScenicSpot,
    GetPlaceTypenUrl,
    QueryCityData,
    AddComment,
    QueryScenicSpotComment,
    QueryUserComment,
    AddRecommendation,
    QueryScenicSpotACity,
    QuerySelfMemory,
    QueryOtherMemory,
    AddMemory,
    QuerySceneCommentLike,
    UpdateSceneCommentLike,
    AddArticle,
    QuerySceneArticle,
    QueryUserArticle,
    QueryArticle
}