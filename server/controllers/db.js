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
        ctx.state.code = 1;        
        return;
    }

    var userData = {
        sex: sex,
        introduction: introduction,
        info_visible: infoVisible,
        memory_visible: memoryVisible
    }
    ctx.state.data = res
}


module.exports = {
    AddUser,
    QueryUser,
    UpdateUser,
    QueryRecommendation
}