"use strict";

var fs = require('fs');
var content = fs.read('LINKS_LIST.txt');
console.log("File loaded");
var pepega = content.split("\n");
var data = " # **The Curators** \n ## Book 1\n";
var book = 2;
for (var i_2 = pepega.length-1; i_2 >= 0; i_2--) { 
		var splotted = pepega[i_2].split('/');
		var name = splotted[splotted.length-2];
        name = name.replace(/(oc_)?(the_)?curators_/g, '');
        if (name.indexOf("book_"+book) > -1) data = data + "\n## Book " + book++ +"\n";
		if (name.indexOf("part") == -1) data = data + "\n";
		data = data + " [" + name.replace(/book_[\d]_/g, '').replace(/_/g, ' ') + "](" + pepega[i_2].replace(/[\r\n\t]/g, '') + ")  ";
		if (name.indexOf("0") > -1) data = data + "\n";
		if (name.indexOf("part") == -1) data = data + "\n";
        data = data.replace(/   /g, ' • ');
		console.log("added " + i_2);
};

fs.write("../Curators1.md", data, 'a');
phantom.exit();
