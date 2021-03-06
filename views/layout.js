var m = require("mithril")
var Service = require("../models/service")
// var User = require("../models/user")
module.exports = {
    oninit:function(){
        localStorage.setItem('version',0)
        localStorage.setItem('phone',0)
        Service.loadList(parseInt(localStorage.getItem('version'))*2+parseInt(localStorage.getItem('phone')))
    },
    view: function (vnode) {
        return m(".container-fluid", [
            m(".mynav.row.justify-content-between",
                [m("h1.col-12", "KT-Image"),
                ]
            ),

            m(".container", m(".row", [
                m(".col-12.col-md-3.push-md-9", m(".list-group",
                    [
                        m("a.list-group-item.list-group-item-action[href='#']",
                            
                                { onclick: function(){Service.versionChange(0)} ,
                                class: localStorage.getItem('version')=="0"?'active':'',},
                                
                                
                            

                            "校园版",

                        ),
                        m("a.list-group-item.list-group-item-action[href='#']",
                            { onclick: function(){Service.versionChange(1)},
                            class: localStorage.getItem('version')=="1"?'active':'' , },
                            
                            "个人版"
                        ),
                        m("a.list-group-item.list-group-item-action[href='#']",
                            { onclick: function(){Service.versionChange(2)},
                        class: localStorage.getItem('version')=="2"?'active':'', },
                            
                            "俱乐部"
                        )
                    ]
                ), ),
                m(".col-12.col-md-9.pull-md-3", [m(".row",
                    m(".col-12.btn-group[data-toggle='buttons']",
                        [
                            m("label.col-6.btn.btn-primary.btn-lg.active",
                            { onclick: function(){Service.phoneChange(0)} },
                                
                                    m("input[autocomplete='off'][checked=''][id='option1'][name='options'][type='radio']"),
                                    
                                    "IOS"
                                
                            ),
                            m("label.col-6.btn.btn-primary.btn-lg",
                            { onclick: function(){Service.phoneChange(1)} },
                                
                                    m("input[autocomplete='off'][id='option2'][name='options'][type='radio']"),
                                    
                                    "Android"
                                
                            )
                        ]
                    )
                ),
                m(".row[style='margin-top:30px;']",
                    m(".iphone-bg", vnode.children)

                ),
                [
                    m("input[id='domain'][type='hidden'][value='http://resource-image.ktfootball.com/']"),
                    m("input[id='uptoken_url'][type='hidden'][value='https://watchman.ktfootball.com/bucky-stg/api/v1/images/uptoken?app_key=d711347ff17a']")
                ],
                m(".row", { style: { "margin-top": "20px" } },
                    [

                        m(".col-md-12",
                            m("[id='container']",
                                m("a.btn.btn-default.btn-lg.[href='#'][id='pickfiles']",
                                    [
                                        m("i.glyphicon.glyphicon-plus"),
                                        m("span",
                                            "选择文件"
                                        )
                                    ]
                                )
                            )
                        ),
                        m(".col-md-12[id='success']", { style: { "display": "none" } },
                            m(".alert-success",
                            )
                        ),
                            m("table.table.table-striped.table-hover.text-left", { style: { "margin-top": "40px", "display": "none" } },
                                [
                                    m("thead",
                                        m("tr",
                                            [
                                                m("th",
                                                    "Filename"
                                                ),
                                                m("th",
                                                    "Size"
                                                ),
                                                m("th",
                                                    "Detail"
                                                )
                                            ]
                                        )
                                    ),
                                    m("tbody[id='fsUploadProgress']",
                                    )
                                ]
                            )
                        
                    ]
                ),

                ]
                )
            ]
            ),
            )


        ])
    }
}