// src/models/User.js
var m2 = require("mithril")
var m = require("./request")
var service = {
    list: [],
    table: [],
    loadList: function (kind) {
        return m.request({
            method: "GET",
            url: "http://localhost:3000/"+kind
        }).then(function (result) {
            var myrequest=[]
            result.map(function(res){
                myrequest.push(m.request({
                    method: "GET",
                    url: "https://watchman.ktfootball.com/bucky-stg/api/v1/images/"+res.key+"?app_key=d711347ff17a"
                }))
            })
             $.when.apply($, myrequest).done(function(){
                var objects=arguments
                result.forEach(function(item,i){
                    item.url=objects[i].data.url
                    item.id=i
                })
                service.list=result
                m2.redraw()
            })
        })
    },

    current: {},

    versionChange:function(arg){
        localStorage.setItem('version',arg)
        service.loadList(parseInt(localStorage.getItem('version'))*2+parseInt(localStorage.getItem('phone')))
    },
    phoneChange:function(arg){
        localStorage.setItem('phone',arg)
        service.loadList(parseInt(localStorage.getItem('version'))*2+parseInt(localStorage.getItem('phone')))
    },

    // delete: function (serviceName) {
    //     var formdata = new FormData()
    //     formdata.append("service_name", serviceName)
    //     m.request({
    //         method: "delete",
    //         url: "https://watchman.ktfootball.com/services/",
    //         data: formdata
    //     })
    //         .then(function (result) {
    //             service.loadList()
    //         })
    // },


}

module.exports = service