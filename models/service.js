// src/models/User.js
var m2 = require("mithril")
var m = require("./request")
var service = {
    list: [],
    table: [],
    loadList: function () {
        return m.request({
            method: "GET",
            url: "https://watchman.ktfootball.com/services"
        }).then(function (result) {
            service.list = result.data
            m2.redraw()
            // if (service.list[0]) {
            //     service.detail(service.list[0].service_name)
            // }
        })
    },

    current: {},

    newService: {},

    status: ['dead', 'alive', 'missing', 'error', 'other'],

    statusClass: [],

    versionChange:function(arg){
        console.log(arg);
    },

    detail: function (serviceName) {

        m.request({
            method: "GET",
            url: "https://watchman.ktfootball.com/services/" + serviceName,
        })
            .then(function (result) {
                service.current = result
                m2.redraw()
            })
    },

    delete: function (serviceName) {
        var formdata = new FormData()
        formdata.append("service_name", serviceName)
        m.request({
            method: "delete",
            url: "https://watchman.ktfootball.com/services/",
            data: formdata
        })
            .then(function (result) {
                service.loadList()
            })
    },

    add: function () {
        var newService=service.newService
        if (!newService.name || !newService.addr) {
            return
        }
        var reg = new RegExp("((http|ftp|https)://)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(/[a-zA-Z0-9\&%_\./-~-]*)?")
        if (!reg.test(newService.addr)) {
            $('#formGroupExampleInput4').popover({
                placement: 'top',
                content: 'Service Addr需要为http[s]://xxx.xxx.xxx[:xxx]格式',
                trigger: 'hover'
            })
            $('#formGroupExampleInput4').popover('show')
        }
        if (newService.name.indexOf(' ') > -1) {
            $('#formGroupExampleInput3').popover({
                placement: 'top',
                content: 'Service Name不能含有空格',
                trigger: 'hover'
            })
            $('#formGroupExampleInput3').popover('show')
        }

        if (newService.name.indexOf(' ') > -1 || !reg.test(newService.addr)) {
            return
        }
        $('#addModal').modal('hide')
        var formdata = new FormData()
        formdata.append("service_name", newService.name)
        formdata.append("service_addr", newService.addr)
        // service.newService = {}
        m2.redraw()
        m.request({
            method: "POST",
            url: "https://watchman.ktfootball.com/services/",
            data: formdata
        }).then(function (result) {
            service.loadList()
        })
    }

}

module.exports = service