// src/views/ServiceForm.js
var m = require("mithril")
var Service = require("../models/service")

module.exports = {
    oninit: function (vnode) {
        //    Service.loadList()
        //    console.log(Service.list)
    },

    view: function () {
        return m("[]",

            m(".carousel.slide[data-ride='carousel'][id='carouselExampleIndicators']",
                m("ol.carousel-indicators",
                    Service.list.map(function (service) {
                        return m("li[data-target='#carouselExampleIndicators'][data-slide-to="+service.id+"]",
                        {class:service.id==0?'active':''},)
                        

                    }),
                    
                ),
                m(".carousel-inner[role='listbox']",
                    Service.list.map(function (service) {
                        return [

                            m(".carousel-item",
                            {class:service.id==0?'active':''},
                                m("img.d-block.img-fluid[src=" + service.url + "]")
                            )
                        ]

                    }),
                ),
                m("a.carousel-control-prev[data-slide='prev'][href='#carouselExampleIndicators'][role='button']",
                    [
                        m("span.carousel-control-prev-icon[aria-hidden='true']"),
                        m("span.sr-only",
                            "Previous"
                        )
                    ]
                ),
                m("a.carousel-control-next[data-slide='next'][href='#carouselExampleIndicators'][role='button']",
                    [
                        m("span.carousel-control-next-icon[aria-hidden='true']"),
                        m("span.sr-only",
                            "Next"
                        )
                    ]
                )

            )

        )
    }
}