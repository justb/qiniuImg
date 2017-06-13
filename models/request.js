var m = require("mithril")

var request = {
    request: function (params) {
        var def = $.Deferred()
        NProgress.start()
        // params.url = params.url + '?auth_token=' + localStorage.getItem('auth_token')
        m.request(params).then(function (result) {

            def.resolve(result)
            NProgress.done()
        }).catch(function (error) {

            def.reject(error)
            // if (error.error === 'Invalid token') {
            //     m.route.set('/login')
            // }
            NProgress.done()
        })

        return def

    }
}

module.exports = request;