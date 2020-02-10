"use strict";

var fs = require('fs');
var content = fs.read('LINKS_LIST.txt');
console.log("File loaded");
var pepega = content.split("\n");
var template = fs.read("template.html");
var data = "<H1> Кураторы </H1> <hr> <h2>Книга 1</h2>";
var book = 2;
for (var i_2 = pepega.length-1; i_2 >= 0; i_2--) { 
		var splotted = pepega[i_2].split('/');
		var name = splotted[splotted.length-2];
        name = name.replace(/(oc_)?(the_)?curators_/g, '');
        if (name.indexOf("book_"+book) > -1) data = data + "<h2>Книга " + book++ +"</h2>";
		data = data + " <a href=\"" + pepega[i_2] + "\">" + name.replace(/book_[\d]_/g, '') + "</a>  ";
        data = data.replace(/   /g, ' • ');
		console.log("added " + i_2);
};
data = data.replace(/(http[s]?\:\/\/[\w]{3}\.reddit\.com\/r\/HFY\/comments\/.{6}\/)([\w]+)\//g,'$2.html');
data = template.replace(/REPLACE-THIS-PART-WITH-CONTENT/g, data + "<hr> Научно-фантастическая повесть в жанре HFY от <a href=\"https://reddit.com/u/localroger/\">Роджера Вильямса</a>");
fs.write("../index.html", data, 'a');
phantom.exit();