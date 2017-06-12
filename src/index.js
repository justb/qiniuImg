// src/index.js
var m = require("mithril")


var Layout = require("../views/Layout")
var image = require("../views/image")
var index = {
    view: function () {
        return m(Layout, m(image))
    }
}
m.route(document.body, "/", {
    "/":index
})