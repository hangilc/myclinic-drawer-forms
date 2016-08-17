"use strict";

var forms = require("./index");
var fs = require("fs");

(function(){
	var shohousen = new forms.Shohousen();
	shohousen.setHakkouKikan("無名県無名市無名町1-2-3", "謀内科クリニック", "12-3456-7890", 1234567);
	shohousen.setDoctor("診察一郎");
	shohousen.setHokenshaBangou("12345678");
	shohousen.setHihokensha("記号・番号");
	shohousen.setKouhi1Futansha("12345678");
	shohousen.setKouhi1Jukyuusha("1234567");
	shohousen.setKouhi2Futansha("87654321");
	shohousen.setKouhi2Jukyuusha("7654321");
	shohousen.setShimei("診療太郎");
	shohousen.setBirthday("平成 10", 8, 12);
	shohousen.setSexMale(); 
	// shohousen.setSexFemale()
	// shohousen.setKubunHihokensha();
	shohousen.setKubunHifuyousha();
	shohousen.setFutanwari(3);
	shohousen.setKoufuDate("平成 28", 12, 14);
	shohousen.setValidUptoDate("平成 28", 12, 18);
	shohousen.setDrugs("Ｒｐ）\n１）薬剤名...");
	var ops = shohousen.getOps();
	fs.writeFileSync("test-out-shohousen.json", JSON.stringify([ops], null, 4));
	console.log("created test-out-shohousen.json");
})();


