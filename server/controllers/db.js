const { mysql } = require('../qcloud')

async function AddUser(ctx, next) {
    const { openId, userName} = ctx.query
    var res = await mysql("user_info").select('*').where({ open_id: openId })
    if(res.length == 0)
        return;

    var userData = {
        open_id: openId,
        user_name: userName,
        introduction: "还没有简介",
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
    const { content, type, scenicSpotId, userId} = ctx.query
    var comment = {
        user_id:userId,
        content: content,
        scenic_spot_id: scenicSpotId,
        evaluation: type,
    }
    var res = await mysql("scene_comment").insert(comment);
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
    AddComment
}