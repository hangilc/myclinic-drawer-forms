"use strict";

var DrugBag = require("./index").DrugBag;
var fs = require("fs");

var pages = [];
(function(){
	var drugbag = new DrugBag({
	    kind: "naifuku",
	    patient_name: "田中 一郎",
	    patient_name_yomi: "たなか いちろう",
	    instructions: ["１日３回 ７日分", "毎食後", "１回１錠"],
	    drug_name: "アムロジピン５ｍｇ錠",
	    desc: "血圧を下げる薬です。",
	    prescribed_at: "平成27年10月28日",
	    clinic_name: "CLINIC_NAME",
	    clinic_address: [
	        "〒123-4567",
	        "CLINIC_ADDR",
	        "CLINIC_PHONE",
	        "CLINIC_HOMEPAGE"]
	});
	var ops = drugbag.getOps();
	pages.push(ops);
})();
(function(){
	var drugbag = new DrugBag({
	    kind: "tonpuku",
	    patient_name: "田中 一郎",
	    patient_name_yomi: "たなか いちろう",
	    instructions: ["１回１錠　１０回分", "血圧上昇時"],
	    drug_name: "アムロジピン５ｍｇ錠",
	    desc: "血圧を下げる薬です。",
	    prescribed_at: "平成27年10月28日",
	    clinic_name: "CLINIC_NAME",
	    clinic_address: [
	        "〒123-4567",
	        "CLINIC_ADDR",
	        "CLINIC_PHONE",
	        "CLINIC_HOMEPAGE"]
	});
	var ops = drugbag.getOps();
	pages.push(ops);
})();
(function(){
	var drugbag = new DrugBag({
	    kind: "gaiyou",
	    patient_name: "田中 一郎",
	    patient_name_yomi: "たなか いちろう",
	    instructions: ["１日２回上腕に塗布"],
	    drug_name: "デルモベート軟膏　５ｇ",
	    desc: "アレルギーを抑える薬です。",
	    prescribed_at: "平成27年10月28日",
	    clinic_name: "CLINIC_NAME",
	    clinic_address: [
	        "〒123-4567",
	        "CLINIC_ADDR",
	        "CLINIC_PHONE",
	        "CLINIC_HOMEPAGE"]
	});
	var ops = drugbag.getOps();
	pages.push(ops);
})();
(function(){
	var drugbag = new DrugBag({
	    kind: "other",
	    patient_name: "　　　　　　",
	    patient_name_yomi: "　　　　　　　　",
	    instructions: [],
	    drug_name: "",
	    desc: "",
	    prescribed_at: "平成27年10月28日",
	    clinic_name: "CLINIC_NAME",
	    clinic_address: [
	        "〒123-4567",
	        "CLINIC_ADDR",
	        "CLINIC_PHONE",
	        "CLINIC_HOMEPAGE"]
	});
	var ops = drugbag.getOps();
	pages.push(ops);
})();

fs.writeFileSync("test-out-drugbag.json", JSON.stringify(pages, null, 4));
console.log("created test-out-drugbag.json");
console.log("view the result at test-drugbag.html");
