"use strict";

var Renderer = require("./receipt.js");

var data = {
	"名前": "{name}",
	"領収金額": "{charge amount}",
	"診察日": "{date}",
	"発効日": "{issue-date}",
	"患者番号": "{patient-id}",
	"保険種別": "{hoken-shubetsu}",
	"負担割合": "{futan-wari}",
	"初・再診料": "{shoshin}",
	"医学管理等": "{kanri}",
	"在宅医療": "{zaitaku}",
	"検査": "{kensa}",
	"画像診断": "{gazou}",
	"投薬": "{touyaku}",
	"注射": "{chuusha}",
	"処置": "{shochi}",
	"その他": "{sonota}",
	"診療総点数": "{total-ten}",
	"保険外１": "hokengai-1", 
	"保険外２": "hokengai-2", 
	"保険外３": "hokengai-3", 
	"保険外４": "hokengai-4"

};
var renderer = new Renderer(data);
var ops = renderer.getOps();
console.log(JSON.stringify(ops, null, 2));
