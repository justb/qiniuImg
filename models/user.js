// src/models/User.js
var m = require("mithril")
// var m =require("./request")
var service = require("./service")
var user = {


    user: {},


    login: function () {
        var user = this.user
        if (!user.username || !user.password) {
            return
        }
        var formdata = new FormData()
        formdata.append("username", user.username)
        formdata.append("password", user.password)
        user = {}
        m.request({
            method: "POST",
            url: "https://watchman.ktfootball.com/services/signin/",
            data: formdata
        })
            .then(function (result) {
                localStorage.setItem("auth_token", result.data.tk)
                m.route.set('/')

            }).catch(function () {
                var $alert = $(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                Invaild username or password !
                                </div>`)
                $(".alert").alert('close')
                $(".wrapper").prepend($alert)
            })
    },
    logout: function(){
        localStorage.clear()
        m.route.set('/login')
    }

}

module.exports = user