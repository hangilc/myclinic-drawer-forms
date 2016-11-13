"use strict";

var Renderer = require("./receipt.js");

var data = {

};
var renderer = new Renderer(data);
var ops = renderer.getOps();
console.log(JSON.stringify(ops, null, 2));
