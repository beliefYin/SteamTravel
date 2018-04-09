const { mysql } = require('../qcloud')

module.exports = async ctx => {
    var res = await mysql('userData').select()
    ctx.state.data = res
}