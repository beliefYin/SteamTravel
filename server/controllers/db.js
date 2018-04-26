const { mysql } = require('../qcloud')

async function AddUser(ctx, next) {

    const { openId, userName} = ctx.query
    var userData = {
        open_id: openId,
        user_name: userName,
        introduction: "还没有简介",
    }
    var res = await mysql("user_info").insert(userData)
    ctx.state.data = res
    // ctx.state.data = {
    //     openid: openId,
    //     userName: userName,
    //     introduction: "还没有简介"
    // }
}

module.exports = {
    AddUser
}