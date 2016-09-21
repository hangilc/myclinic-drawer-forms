"use strict";

var Compiler = require("myclinic-drawer").Compiler;
var Box = require("myclinic-drawer").Box;

exports.getOps = function(data, config){
    config = setup(config || {});
	var comp = new Compiler();
	var lines = [];
	lines.push(data.name + "様" + " " + data.at);
	lines.push("");
	lines = lines.concat(drugPart(data.drugs));
	lines.push("");
	lines = lines.concat(data.clinic);
	comp.createFont("regular", "MS Gothic", config.fontSize);
	comp.setFont("regular");
	var box = new Box(0, 0, config.width, 210).inset(config.inset);
	lines = breakToParagraph(comp, lines, box.width());
	comp.multilineText(lines, box, "left", "top");
	return comp.getOps();

    function setup(config){
        var defaultConfig = {
            fontSize: 4.6,
            inset: 5,
            width: 148
        }
        for(var key in config){
            defaultConfig[key] = config[key];
        }
        return defaultConfig;
    }
};

function breakToParagraph(compiler, lines, width){
	var result = [];
	lines.forEach(function(line){
		var lines = compiler.breakLines(line, width);
		result = result.concat(lines);
	});
	return result;
}

function drugPart(drugs){
	return drugs.map(function(drug, index){
		return (index+1)+") " + drug;
	});
}

// function clinicPart(){
// 	return [
//         "CLINIC_NAME",
//         "CLINIC_ADDRESS",
//         "CLINIC_PHONE",
//         "CLINIC_DOCTOR"
// 	];
// }

exports.drugRep = function(drug){
	var category = parseInt(drug.d_category, 10);
	switch(category){
		case mConsts.DrugCategoryNaifuku:
			return drug.name + " " + drug.d_amount + drug.unit + " " + drug.d_usage + 
				" " + drug.d_days + "日分";
		case mConsts.DrugCategoryTonpuku:
			return drug.name + " １回 " + drug.d_amount + drug.unit + " " + drug.d_usage +
				" " + drug.d_days + "回分";
		case mConsts.DrugCategoryGaiyou:
			return drug.name + " " + drug.d_amount + drug.unit + " " + drug.d_usage;
		default:
			return drug.name + " " + drug.d_amount + drug.unit;
	}
};
