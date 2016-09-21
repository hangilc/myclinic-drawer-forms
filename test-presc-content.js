"use strict";

var fs = require("fs");
var PrescContent = require("./index").PrescContent;

var ops = PrescContent.getOps({
	name: "LAST_NAME FIRST_NAME",
	at: "平成28年9月19日",
	drugs: [
		"アムロジピン錠５ｍｇ １錠 分１　朝食後　28日分",
		"ロサルタン錠２５ｍｇ １錠 分１　朝食後　28日分"
	],
	clinic: [
		"CLINIC_LINE_1",
		"CLINIC_LINE_2",
		"CLINIC_LINE_3",
		"CLINIC_LINE_4"
	]
});
var ops2 = PrescContent.getOps({
	name: "LAST_NAME FIRST_NAME",
	at: "平成28年9月19日",
	drugs: [
		"アムロジピン錠５ｍｇ １錠 分１　朝食後　28日分",
		"ロサルタン錠２５ｍｇ １錠 分１　朝食後　28日分"
	],
	clinic: [
		"CLINIC_LINE_1",
		"CLINIC_LINE_2",
		"CLINIC_LINE_3",
		"CLINIC_LINE_4"
	]
}, {
    fontSize: 3.2,
    inset: 4,
    width: 99
});
fs.writeFileSync("test-out-presc-content.json", JSON.stringify([ops, ops2], null, 4));
console.log("created test-out-presc-content.json");
console.log("view the result at test-presc-content.html");
