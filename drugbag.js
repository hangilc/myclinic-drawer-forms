"use strict";

var Compiler = require("myclinic-drawer").Compiler;
var Box = require("myclinic-drawer").Box;

var GOTHIC = "MS GOTHIC";
var MINCHO = "MS MINCHO";
var LARGE_FONT = "large-font";
var MEDIUM_FONT = "medium-font";
var REGULAR_FONT = "regular-font";
var SMALL_FONT = "small-font";

var LARGE_FONT_SIZE = 9.88;
var MEDIUM_FONT_SIZE = 6.35;
var REGULAR_FONT_SIZE = 4.94;
var SMALL_FONT_SIZE = 3.43;
var DRUGBOX_FONT_SIZE = REGULAR_FONT_SIZE;

function kindColor(kind){
    switch(kind){
        case "naifuku": return [0, 0, 255];
        case "tonpuku": return [0, 255, 0];
        case "gaiyou":  return [255, 0, 0];
        default: return [0, 0, 0];
    }
}

function kindLabel(kind){
    switch(kind){
        case "naifuku": return "内服薬";
        case "tonpuku": return "頓服薬";
        case "gaiyou":  return "外用薬";
        default: return "おくすり";
    }
}

function Drugbag(data){
    data = data || {};
    this.compiler = new Compiler();
    this.pointDict = {};
    this.boxDict = {};
    this.kind = data.kind || "sonota";
    this.setup(data);
}

Drugbag.prototype.getOps = function(){
    return this.compiler.getOps();
};

Drugbag.prototype.setup = function(data){
    var layout = getDrugbagLayout();
    var c = this.compiler;
    var color = kindColor(this.kind);
    this.registerFonts();
    c.createPen("regular-pen", color);
    c.setPen("regular-pen");
    c.setTextColor(color);
    this.setupTitle(c, layout.title_box, kindLabel(this.kind));
    this.setupPatientName(c, layout.patient_name_box, data.patient_name);
    this.setupPatientNameYomi(c, layout.patient_name_yomi_box, data.patient_name_yomi);
    this.setupDrugBox(c, layout.drug_box, data.instructions);
    this.setupDrugName(c, layout.name_box, data.drug_name);
    this.setupDesc(c, layout.desc_box, data.desc);
    this.setupPrescribedAt(c, layout.prescribed_at_box, data.prescribed_at);
    c.frameTop(layout.footer_box);
    c.box(layout.stamp_box);
    this.setupStampLabel(c, layout.stamp_label_box);
    this.setupClinicName(c, layout.clinic_name_box, data.clinic_name);
    this.setupClinicAddr(c, layout.clinic_addr_box, data.clinic_address);
};

Drugbag.prototype.setupClinicAddr = function(c, box, addr){
    if( !addr ) return;
    c.setFont(SMALL_FONT);
    c.multilineText(addr, box, "left", "top", 1.4);
};

Drugbag.prototype.setupClinicName = function(c, box, name){
    if( !name ) return;
    c.setFont(MEDIUM_FONT);
    c.textIn(name, box, "left", "top");
};

Drugbag.prototype.setupStampLabel = function(c, box){
    c.setFont(SMALL_FONT);
    c.textIn("調剤者の印", box, "center", "top");
};

Drugbag.prototype.setupPrescribedAt = function(c, box, at){
    if( !at ) return;
    c.setFont(SMALL_FONT);
    c.textIn("調剤年月日 " + at, box, "left", "top")
};

Drugbag.prototype.setupDesc = function(c, box, desc){
    var lines;
    c.box(box);
    if( !desc ) return;
    lines = desc.split(/\r\n|\n|\r/g);
    box = box.clone();
    box.inset(1, 0.8);
    c.setFont(SMALL_FONT);
    c.multilineText(lines, box, "left", "top", 0.65);
}

Drugbag.prototype.setupDrugName = function(c, box, name){
    if( !name ) return;
    c.setFont(REGULAR_FONT);
    if( name.indexOf("\n") >= 0 ){
        c.multilineText(name.split(/\r\n|\n|\r/g), box, "left", "bottom", 0.5);
    } else {
        c.textIn(name, box, "center", "bottom");
    }
};

Drugbag.prototype.setupDrugBox = function(c, box, instructions){
    var h, leading = 2.0;
    if( !instructions ) return;
    c.setFont(REGULAR_FONT);
    box = box.clone();
    instructions.forEach(function(text){
        if( text.indexOf("\n") >= 0 ){
            h = c.multilineText(text.split(/\r\n|\n|\r/g), box, "left", "top", leading);
        } else {
            h = c.textIn(text, box, "center", "top");
        }
        box.setTop(h.bottom() + leading);
    });
}

Drugbag.prototype.setupPatientNameYomi = function(c, box, yomi){
    yomi = yomi || "　　　 　　　　";
    yomi = "(" + yomi + ")";
    c.setFont(REGULAR_FONT);
    c.textIn(yomi, box, "center", "top");
}

Drugbag.prototype.setupPatientName = function(c, box, name){
    name = name || "　　　 　　　";
    name += " 様";
    c.setFont(MEDIUM_FONT);
    c.textIn(name, box, "center", "top");
}

Drugbag.prototype.setupTitle = function(c, box, title){
    c.setFont(LARGE_FONT);
    c.textIn(title, box, "center", "center");
}

Drugbag.prototype.registerFonts = function(){
    var c = this.compiler;
    c.createFont(LARGE_FONT, GOTHIC, LARGE_FONT_SIZE)
    c.createFont(MEDIUM_FONT, GOTHIC, MEDIUM_FONT_SIZE)
    c.createFont(REGULAR_FONT, GOTHIC, REGULAR_FONT_SIZE)
    c.createFont(SMALL_FONT, GOTHIC, SMALL_FONT_SIZE)
};

Drugbag.drugBoxWidth = 98; // mm
Drugbag.drugBoxFontSize = DRUGBOX_FONT_SIZE; // mm
Drugbag.drugBoxFontFace = GOTHIC;
Drugbag.descFontFace = GOTHIC;
Drugbag.descFontSize = SMALL_FONT_SIZE;
Drugbag.descBoxWidth = 74 + 0.8; // mm
Drugbag.descContentBoxWidth = Drugbag.descBoxWidth - 2;

function getDrugbagLayout(){
    var paperWidth = 128,
        paperHeight = 182,
        paper = new Box(0, 0, paperWidth, paperHeight),
        footer = innerBox(paper, 10, 140, 108, 37);
    return {
        "paper": paper.clone(),
        "title_box": innerBox(paper, 0, 35, 128, 9.88),
        "patient_name_box": innerBox(paper, 10, 52.88, 108, 6.35),
        "patient_name_yomi_box": innerBox(paper, 10, 61.23, 108, 4.94),
        "drug_box": innerBox(paper, 15, 71.17, Drugbag.drugBoxWidth, 17.83),
        "name_box": innerBox(paper, 18+1.5, 91, 84, 16),
        "desc_box": innerBox(paper, 27.5, 111, Drugbag.descBoxWidth, 20+1),
        "prescribed_at_box": innerBox(paper, 64, 134, 54, 3.53),
        "footer_box": footer,
        "clinic_name_box": innerBox(footer, 0, 5, 70, 6.35),
        "clinic_addr_box": innerBox(footer, 0, 14.35, 70, 22.65),
        "stamp_box": innerBox(footer, 78, 5, 20, 20),
        "stamp_label_box": innerBox(footer, 78, 27, 20, 3.53),
    };
    
    function innerBox(parent, left, top, width, height){
        return parent.innerBox(left, top, left + width, top + height);
    }
}

module.exports = Drugbag;
