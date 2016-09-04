"use strict";

var Refer = require("./index").Refer;
var fs = require("fs");

var refer = new Refer();
refer.setTitle("紹介状");
refer.setReferHospital("河北総合病院");
refer.setReferDoctor("無名一郎　先生");
refer.setPatientName("無名和子　様");
refer.setPatientInfo("昭和１２年１月１日生、８２才、女性");
refer.setDiagnosis("診断：　呼吸困難感");
refer.setContent("いつも大変お世話になっております。\n高血圧にて当院に通院されている方ですが、３日前から呼吸困難覚があります。")
refer.setIssueDate("平成２８年９月４日");
refer.setAddress(
	"〒123-4567", 
	"東京都無名区無名町 1-23-4", 
	"tel 00-1234-5678", 
	"Fax 09-1234-5679", 
	"某内科クリニック", 
	"診療　某"
);
var ops = refer.getOps();
fs.writeFileSync("test-out-refer.json", JSON.stringify(ops, null, 4));
console.log("created test-out-refer.json");
console.log("view the result at test-refer.html");

