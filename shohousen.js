"use strict";

var Compiler = require("myclinic-drawer").Compiler;
var Box = require("myclinic-drawer").Box;

function Shohousen(){
	this.compiler = new Compiler();
	this.setup();
}

Shohousen.prototype.getOps = function(){
	return this.compiler.getOps();
};

Shohousen.prototype.setup = function(){
	var compiler = this.compiler;
	var page = Box.createA5Box();
	var wrap = page.clone().shrinkWidth(1, "left").shiftUp(2).inset(2);
	var r, rr, box2;
	var pat, issue, drugs, memo, chouzai1, chouzai2, patient, clinic;
	this.wrap = wrap;
	//compiler.box(this.wrap);
	compiler.createFont("mincho-5", "MS Mincho", 5);
	compiler.createFont("mincho-4.5", "MS Mincho", 4.5);
	compiler.createFont("mincho-4", "MS Mincho", 4);
	compiler.createFont("mincho-3.5", "MS Mincho", 3.5);
	compiler.createFont("mincho-3", "MS Mincho", 3);
	compiler.createFont("mincho-2.5", "MS Mincho", 2.5);
	compiler.createFont("mincho-2", "MS Mincho", 2);
	compiler.createFont("mincho-1.8", "MS Mincho", 1.8);
	compiler.createFont("mincho-1.5", "MS Mincho", 1.5);
	compiler.createFont("mincho-1.4", "MS Mincho", 1.4);
    compiler.createFont("gothic-4.5", "MS Gothic", 4.5);
    compiler.createFont("gothic-4", "MS Gothic", 4);
    compiler.createFont("gothic-3", "MS Gothic", 3);
	compiler.createFont("gothic-2.5", "MS Gothic", 2.5);
	compiler.setTextColor(0, 255, 0);
	compiler.createPen("default-pen", 0, 255, 0, 0.1);
	compiler.setPen("default-pen");
	this.drawTitle();
	r = wrap.clone().shiftDown(13).setHeight(10.5, "top");
	rr = r.splitToColumns(62);
	this.frameKouhi(rr[0].shrinkWidth(2, "left"));
	this.frameHoken(rr[1]);
	box2 = wrap.clone().setTop(r.bottom()+2).setHeight(154.5, "top");
	rr = box2.splitToRows(18, 24.5, 109, 143, 149.5);
	pat = rr[0];
	issue = rr[1];
	drugs = rr[2];
	memo = rr[3];
	chouzai1 = rr[4];
	chouzai2 = rr[5];
	rr = pat.splitToColumns(55);
	patient = rr[0];
	clinic = rr[1].shrinkWidth(1, "right");
	this.framePatient(patient);
	this.frameClinic(clinic);
	this.frameIssue(issue);
	this.frameDrugs(drugs);
	this.frameMemo(memo);
	this.frameChouzai1(chouzai1);
	this.frameChouzai2(chouzai2);
	r = wrap.clone();
	r.setTop(box2.bottom() + 1);
	r.setHeight(24.5, "top");
	this.framePharmacy(r);
};

Shohousen.prototype.drawTitle = function(){
	var c = this.compiler;
	var b = this.wrap.clone();
	b.shiftDown(1).setLeft(51).setRight(93);
	c.setFont("mincho-5");
	c.textAtJustified("処方せん", b.left(), b.right(), b.top(), "top");
	b.shiftDown(6);
	c.setFont("mincho-2.5");
	c.textIn("(この処方せんは、どの保険薬局でも有効です。)", b, "center", "top");
};

Shohousen.prototype.frameKouhi = function(r){
	var c = this.compiler;
	var rr = r.splitToEvenRows(2);
	var row1 = rr[0], row2 = rr[1], cc;
	c.box(row1);
	cc = row1.splitToColumns(14.3);
	c.frameRight(cc[0]);
	c.setFont("mincho-2");
	c.textAtJustified("公費負担者番号", cc[0].left()+0.5, cc[0].right()-0.5, cc[0].cy(), "center");
	c.setBox("futanshaBangou", cc[1]);
	c.drawEvenInnerColumnBorders(cc[1], 8);
	row2.shrinkWidth(cc[1].width()/8, "left");
	c.box(row2);
	cc = row2.splitToColumns(14.3);
	c.frameRight(cc[0]);
	c.textAtJustified("公費負担医療", cc[0].left()+0.5, cc[0].right()-0.5, cc[0].top()+cc[0].height()/4, "center");
	c.textAtJustified("の受給者番号", cc[0].left()+0.5, cc[0].right()-0.5, cc[0].top()+cc[0].height()/4*3, "center");
	c.setBox("jukyuushaBangou", cc[1]);
	c.drawEvenInnerColumnBorders(cc[1], 7);
}

Shohousen.prototype.frameHoken = function(r){
	var c = this.compiler;
	var rr = r.splitToEvenRows(2);
	var upper = rr[0], lower = rr[1], left, right;
	upper.setWidth(58, "left");
	c.box(upper);
	rr = upper.splitToColumns(13);
	left = rr[0];
	right = rr[1];
	c.frameRight(left);
	c.setFont("mincho-2");
	c.textAtJustified("保険者番号", left.left()+0.5, left.right()-0.5, left.cy(), "center");
	c.setBox("hokenshaBangou", right);
	c.drawEvenInnerColumnBorders(right, 8);
	c.box(lower);
	rr = lower.splitToColumns(13);
	left = rr[0];
	right = rr[1];
	c.setBox("hihokensha", right);
	c.frameRight(left);
	c.setFont("mincho-1.4");
	c.textAtJustified("被保険者証・被保険", left.left()+0.5, left.right()-0.5, left.top()+left.height()/4, "center");
	c.textAtJustified("者手帳の記号・番号", left.left()+0.5, left.right()-0.5, left.top()+left.height()/4*3, "center");
}

Shohousen.prototype.framePatient = function(r){
	var c = this.compiler;
	var p, rr, upper, middle, lower, dd;
	c.box(r);
	p = r.clone();
	p.setWidth(4, "left");
	c.frameRight(p);
	c.setFont("mincho-2.5");
	c.textAtVertJustified("患者", p.cx(), p.top()+4, p.bottom()-4, "center");
	p.setLeft(p.right()).setRight(r.right());
	rr = p.splitToRows(9.5, 13.8);
	c.frameBottom(rr[0]);
	c.frameBottom(rr[1]);
	upper = rr[0];
	middle = rr[1];
	lower = rr[2];
	rr = upper.splitToColumns(10.5);
	p = rr[0];
	c.setBox("patientName", rr[1]);
	c.frameRight(p);
	c.setFont("mincho-2.5");
	c.textAtJustified("氏名", p.left()+2, p.right()-2, p.cy(), "center");
	rr = middle.splitToColumns(10.5, 39);
	p = rr[0];
	c.frameRight(p);
	c.setFont("mincho-2");
	c.textAtJustified("生年月日", p.left()+0.5, p.right()-0.5, p.cy(), "center");
	p = rr[1];
	c.frameRight(p);
	dd = p.splitToColumns(9, 17, 25);
	c.setBox("birthdayYear", dd[0]);
	c.setBox("birthdayMonth", dd[1]);
	c.setBox("birthdayDay", dd[2]);
	this.labelDate(dd);
	p = rr[2];
	dd = p.splitToEvenColumns(3);
	c.setBox("sexMale", dd[0]);
	c.setBox("sexFemale", dd[2]);
	c.textIn("男", dd[0], "center", "center");
	c.textIn("・", dd[1], "center", "center");
	c.textIn("女", dd[2], "center", "center");
	rr = lower.splitToColumns(10.5, 24, 37.3);
	c.setBox("patientHihokensha", rr[1]);
	c.setBox("patientHifuyousha", rr[2]);
	c.setBox("patientFutan", rr[3].clone().shrinkWidth(4, "left"));
	c.drawInnerColumnBorders(rr);
	c.setFont("mincho-2.5");
	c.textAtJustified("区分", rr[0].left()+2, rr[0].right()-2, rr[0].cy(), "center");
	c.textIn("被保険者", c.getBox("patientHihokensha").clone().inset(1.5, 0), "justified", "center");
	c.textIn("被扶養者", c.getBox("patientHifuyousha").clone().inset(1.5, 0), "justified", "center");
	c.textIn("割", c.getBox("patientFutan").clone().shiftToRight(3), "right", "center");
};

Shohousen.prototype.frameClinic = function(box){
	var c = this.compiler;
	var rr = box.splitToRows(9.5, 13.8);
	var upper = rr[0];
	var middle = rr[1];
	var lower = rr[2];
	rr = upper.splitToColumns(11);
	var p = rr[0];
	c.setBox("clinicInfo", rr[1]);
	p.shrinkHeight(1.5, "bottom");
	p.shrinkHeight(0.5, "bottom");
	var pp = p.splitToEvenRows(3);
	c.setFont("mincho-1.5");
	c.textIn("保険医療機関", pp[0], "justified", "top");
	c.setFont("mincho-1.8");
	c.textIn("の所在地", pp[1], "justified", "center");
	c.textIn("及び名称", pp[2], "justified", "bottom");
	rr = middle.splitToColumns(11);
	c.setBox("clinicPhone", rr[1]);
	c.textIn("電話番号", rr[0], "justified", "center");
	rr = lower.splitToColumns(11);
	c.setBox("clinicDoctor", rr[1]);
	c.textIn("保険医氏名", rr[0], "justified", "center");
	c.setBox("clinicHanko", new Box(
		box.left() + 53.5+7, box.bottom() - 5.5, box.left() + 56.5+7, box.bottom() - 2.5));
	c.textIn("印", c.getBox("clinicHanko"), "center", "center");
};

Shohousen.prototype.frameIssue = function(box){
	var c = this.compiler;
	c.box(box);
	var rr = box.splitToColumns(14.5, 55, 71.5);
	c.setFont("mincho-2.5");
	c.frameRight(rr[0]);
	c.frameRight(rr[1]);
	c.frameRight(rr[2]);
	c.textIn("交付年月日", rr[0].clone().inset(0.5, 0), "justified", "center");
	var pp = rr[1].splitToColumns(16, 24, 32);
	c.setBox("issueYear", pp[0]);
	c.setBox("issueMonth", pp[1]);
	c.setBox("issueDay", pp[2]);
	c.setFont("mincho-2");
	this.labelDate(pp);
	pp = rr[2].splitToEvenRows(2);
	c.textIn("処方せんの", pp[0].inset(0.5, 0), "justified", "center");
	c.textIn("使用期間", pp[1].inset(0.5, 0), "justified", "center");
	var b = rr[3];
	rr = b.splitToColumns(16, 25, 35);
	c.setBox("validYear", rr[0]);
	c.setBox("validMonth", rr[1]);
	c.setBox("validDay", rr[2]);
	this.labelDate(rr);
	b.shrinkWidth(40, "right");
	b.inset(1.5, 0);
	rr = b.splitToEvenRows(3);
	c.setFont("mincho-1.8");
	c.textIn("特に記載のある場合を除き、", rr[0], "center", "center");
	c.textIn("交付の日を含めて４日以内に保", rr[1], "center", "center");
	c.textIn("険薬局に提出すること。", rr[2], "center", "center");
};

Shohousen.prototype.frameDrugs = function(box){
	var c = this.compiler;
	c.box(box);
	var rr = box.splitToColumns(4);
	c.frameRight(rr[0]);
	c.setFont("mincho-2.5");
	c.textIn("処方", rr[0].clone().inset(0, 24), "center", "justified", "vertical");
	c.setBox("drugsPane", rr[1]);
};

Shohousen.prototype.frameMemo = function(r){
	var c = this.compiler;
	c.box(r);
	var rr = r.splitToColumns(4);
	c.frameRight(rr[0]);
	c.setFont("mincho-2.5");
	c.textIn("備考", rr[0].clone().inset(0, 7), "center", "justified", "vertical");
	c.setBox("memoPane", rr[1]);
};

Shohousen.prototype.frameChouzai1 = function(r){
	var c = this.compiler;
	c.box(r);
	var rr = r.splitToColumns(14.5, 82, 95.5);
	c.drawInnerColumnBorders(rr);
	c.setFont("mincho-2");
	c.textIn("調剤年月日", rr[0].clone().inset(1, 0), "justified", "center");
	var dd = rr[1].splitToColumns(28, 41, 53);
	this.labelDate(dd);
	c.setFont("mincho-1.5");
	c.textIn("公費負担者番号", rr[2].clone().inset(0.5, 0), "justified", "center");
	c.setBox("futanshaBangou2", rr[3]);
	c.drawEvenInnerColumnBorders(rr[3], 8);
};

Shohousen.prototype.frameChouzai2 = function(r){
	var c = this.compiler;
	var rr = r.splitToColumns(14.5, 82, 95.5);
	c.drawInnerColumnBorders(rr);
	c.setFont("mincho-2");
	var cc = rr[0].splitToEvenRows(3);
	c.setFont("mincho-1.5");
	c.textIn("保険薬局の所在", cc[0].clone().inset(0.5, 0), "justified", "center");
	c.textIn("地及び名称", cc[1].clone().inset(0.5, 0), "justified", "center");
	c.textIn("保険薬剤師氏名", cc[2].clone().inset(0.5, 0), "justified", "center");
	c.setFont("mincho-2");
	c.textIn("印", rr[1].clone().shiftToRight(59), "left", "center");
	c.setFont("mincho-1.5");
	cc = rr[2].clone().inset(0.5, 0).splitToEvenRows(2);
	c.textIn("公費負担医療", cc[0], "justified", "center");
	c.textIn("の受給者番号", cc[1], "justified", "center");
	var bb = rr[3].splitToEvenColumns(8);
	c.setBox("jukyuushaBangou2", rr[3]);
	c.getBox("jukyuushaBangou2").setRight(bb[7].left());
	c.drawEvenInnerColumnBorders(c.getBox("jukyuushaBangou2"), 7);
	r.setRight(bb[7].left());
	c.box(r);
};

Shohousen.prototype.framePharmacy = function(r){
	var c = this.compiler;
	var rr = r.splitToColumns(85);
	var left = rr[0];
	var right = rr[1];
	c.box(left);
	c.box(right);
	c.setFont("mincho-2");

	var pp = left.splitToRows(3, 10, 17);
	c.frameBottom(pp[0]);
	c.frameBottom(pp[1]);
	c.frameBottom(pp[2]);
	var qq = pp[0].splitToColumns(11.5, 27.8, 47, 57.3, 76.5);
	for (var i = 0; i < 5; i++)
		c.frameRight(qq[i]);
	c.textIn("調剤料", qq[0].clone().inset(1, 0), "justified", "center");
	c.textIn("薬剤料", qq[1].clone().inset(3, 0), "justified", "center");
	c.textIn("計", qq[2], "center", "center");
	c.textIn("調剤数量", qq[3].clone().inset(0.5, 0), "justified", "center");
	c.textIn("合計", qq[4].clone().inset(4, 0), "justified", "center");
	c.textIn("加算", qq[5].clone().inset(1.5, 0), "justified", "center");
	for (var j = 1; j <= 3; j++) {
		qq = pp[j].splitToColumns(11.5, 27.8, 47, 57.3, 76.5);
		for (var i = 0; i < 5; i++)
			c.frameRight(qq[i]);
	}

	pp = right.splitToRows(3, 10, 13);
	for (var i = 0; i < 3; i++)
		c.frameBottom(pp[i]);
	qq = pp[0].splitToColumns(19.5, 39);
	for (var i = 0; i < 2; i++)
		c.frameRight(qq[i]);
	c.textIn("調剤基本料", qq[0].clone().inset(2, 0), "justified", "center");
	c.textIn("管理指導料", qq[1].clone().inset(2, 0), "justified", "center");
	c.textIn("総合計", qq[2].clone().inset(2, 0), "justified", "center");
	qq = pp[1].splitToColumns(19.5, 39);
	for (var i = 0; i < 2; i++)
		c.frameRight(qq[i]);
	qq = pp[2].splitToColumns(19.5, 39);
	for (var i = 0; i < 2; i++)
		c.frameRight(qq[i]);
	c.textIn("患者負担金", qq[0].clone().inset(2, 0), "justified", "center");
	c.textIn("請求金額", qq[1].clone().inset(2, 0), "justified", "center");
	c.textIn("調剤済印", qq[2].clone().inset(2, 0), "justified", "center");
	qq = pp[3].splitToColumns(19.5, 39);
	for (var i = 0; i < 2; i++)
		c.frameRight(qq[i]);
};

Shohousen.prototype.labelDate = function(cols){
	var c = this.compiler;
	var offset = 1;
	c.textIn("年", cols[0].clone().flipRight().shiftToRight(offset), "left", "center");
	c.textIn("月", cols[1].clone().flipRight().shiftToRight(offset), "left", "center");
	c.textIn("日", cols[2].clone().flipRight().shiftToRight(offset), "left", "center");
};

Shohousen.prototype.setHakkouKikan = function(address, name, phone, kikancode){
	var c = this.compiler;
	var clinic_info = c.getBox("clinicInfo");
	var clinic_phone = c.getBox("clinicPhone");
	var r = clinic_info.clone().shift(2, 1);
    c.setTextColor(0, 255, 0);
	c.setFont("mincho-3");
	c.textIn(address, r, "left", "top");
	r.shift(4, 4);
	c.setFont("mincho-4");
	c.textIn(name, r, "left", "top");
	var rr = r.clone();
	rr.shrinkWidth(34, "right");
	rr.shrinkHeight(0.5, "bottom");
	c.setFont("mincho-3");
	c.textIn("(機関コード " + kikancode + ")", rr, "left", "top");
	r = clinic_phone.clone().shift(6, 0);
	c.setFont("mincho-3");
	c.textIn(phone, r, "left", "top");
};

Shohousen.prototype.setDoctor = function(name){
	var c = this.compiler;
	var clinic_doctor = c.getBox("clinicDoctor");
	var r = clinic_doctor.clone().shift(35, 0);
    c.setTextColor(0, 255, 0);
	c.setFont("mincho-3.5");
	c.textIn(name, r, "left", "top");
};

Shohousen.prototype.setHokenshaBangou = function(str){
	var c = this.compiler;
	var hokensha_bangou = c.getBox("hokenshaBangou");
	var box = hokensha_bangou.clone();
    c.setTextColor(0, 0, 0);
	c.setFont("gothic-4");
	c.textInEvenColumns(str, box, 8, "right");
};

Shohousen.prototype.setHihokensha = function(str){
	var c = this.compiler;
	var box = c.getBox("hihokensha").clone();
	box.shrinkWidth(5, "right");
    c.setTextColor(0, 0, 0);
	c.setFont("gothic-4");
	c.textIn(str, box, "left", "center");
};

Shohousen.prototype.setKouhi1Futansha = function(str){
	var c = this.compiler;
	var box = c.getBox("futanshaBangou");
    c.setTextColor(0, 0, 0);
	c.setFont("gothic-4");
	c.textInEvenColumns(str, box, 8, "right");
};

Shohousen.prototype.setKouhi1Jukyuusha = function(str){
	var c = this.compiler;
	var box = c.getBox("jukyuushaBangou");
    c.setTextColor(0, 0, 0);
	c.setFont("gothic-4");
	c.textInEvenColumns(str, box, 7, "right");
};

Shohousen.prototype.setKouhi2Futansha = function(str){
	var c = this.compiler;
	var box = c.getBox("futanshaBangou2");
    c.setTextColor(0, 0, 0);
	c.setFont("gothic-4");
	c.textInEvenColumns(str, box, 8, "right");
};

Shohousen.prototype.setKouhi2Jukyuusha = function(str){
	var c = this.compiler;
	var box = c.getBox("jukyuushaBangou2");
    c.setTextColor(0, 0, 0);
	c.setFont("gothic-4");
	c.textInEvenColumns(str, box, 7, "right");
};

Shohousen.prototype.setShimei = function(str, nameSmaller){
	var c = this.compiler;
	var box = c.getBox("patientName").clone();
	box.shrinkWidth(2, "right");
	var size = 4.5;
	if (nameSmaller)
		size = 3.5;
    c.setTextColor(0, 0, 0);
	c.setFont("mincho-" + size);
    c.textIn(str, box, "left", "center");
};

Shohousen.prototype.setBirthday = function(nen, tsuki, hi){
	var c = this.compiler;
    c.setTextColor(0, 0, 0);
    c.setFont("gothic-2.5");
    var box = c.getBox("birthdayYear");
    c.textIn("" + nen, box, "right", "center");
    box = c.getBox("birthdayMonth");
    c.textIn("" + tsuki, box, "right", "center");
    box = c.getBox("birthdayDay");
    c.textIn("" + hi, box, "right", "center");
};

Shohousen.prototype.setSexMale = function(){
	var c = this.compiler;
    c.setTextColor(0, 0, 0);
    c.setFont("gothic-3");
    var box = c.getBox("sexMale");
    c.textIn("○", box.clone().shiftUp(0.3), "center", "center");
};

Shohousen.prototype.setSexFemale = function(){
	var c = this.compiler;
    c.setTextColor(0, 0, 0);
    c.setFont("gothic-3");
    var box = c.getBox("sexFemale");
    c.textIn("○", box.clone().shiftUp(0.3), "center", "center");
};

Shohousen.prototype.setKubunHihokensha = function(){
	var c = this.compiler;
    c.setTextColor(0, 0, 0);
    c.setFont("gothic-3");
    var box = c.getBox("patientHihokensha");
    c.textIn("○", box.clone().shiftUp(0.3), "center", "center");
};

Shohousen.prototype.setKubunHifuyousha = function(){
	var c = this.compiler;
    c.setTextColor(0, 0, 0);
    c.setFont("gothic-3");
    var box = c.getBox("patientHifuyousha");
    c.textIn("○", box.clone().shiftUp(0.3), "center", "center");
};

Shohousen.prototype.setFutanwari = function(str){
	var c = this.compiler;
    c.setTextColor(0, 0, 0);
	c.setFont("gothic-3");
	var box = c.getBox("patientFutan");
	c.textIn("" + str, box, "right", "center");
};

Shohousen.prototype.setKoufuDate = function(nen, tsuki, hi){
	var c = this.compiler;
    c.setTextColor(0, 0, 0);
    c.setFont("gothic-2.5");
    var box = c.getBox("issueYear");
    c.textIn("" + nen, box, "right", "center");
    box = c.getBox("issueMonth");
    c.textIn("" + tsuki, box, "right", "center");
    box = c.getBox("issueDay");
    c.textIn("" + hi, box, "right", "center");
};

Shohousen.prototype.setValidUptoDate = function(nen, tsuki, hi){
	var c = this.compiler;
    c.setTextColor(0, 0, 0);
    c.setFont("gothic-2.5");
    var box = c.getBox("validYear");
    c.textIn("" + nen, box, "right", "center");
    box = c.getBox("validMonth");
    c.textIn("" + tsuki, box, "right", "center");
    box = c.getBox("validDay");
    c.textIn("" + hi, box, "right", "center");
};

Shohousen.prototype.setDrugs = function(text){
	var c = this.compiler;
	var lines = text.trim().split(/\s*(?:\r\n|\r|\n)/g);
	if( lines[0] === "院外処方" ){
		lines = lines.slice(1);
	}
	if( lines.length > 0 ){
		lines.push("------以下余白------");
	}
	c.setTextColor(0, 0, 0);
	c.setFont("gothic-4.5");
	c.multilineText(lines, c.getBox("drugsPane"), "left", "top");
};

module.exports = Shohousen;
