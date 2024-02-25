"use strict";

// localization strings
var	loc_HTML_lang = "en",
	loc_HTML_desc = "The Sci-Fi HFY soap opera by Roger Williams",
	loc_title = "The Curators",
	loc_book = "Book",
	loc_part = "Part",
	loc_coda = "Coda",
	loc_missing = "Chapter is present on Reddit but missing local-side.",
	loc_desc = "A Sci-Fi HFY story by",
	loc_authorName = "Roger Williams";

// add new seclast() method
if (!Array.prototype.seclast){
	Array.prototype.seclast = function(){
		return this[this.length - 2];
	};
};

// phantomJS — prepare the filesystem submodule
var fs = require('fs');

// read and localize the template
var template = fs.read("template.html"); 
template = template.replace(/\$lang/g, loc_HTML_lang);
template = template.replace(/\$title/g, loc_title);
template = template.replace(/\$description/g, loc_HTML_desc);

// read and split the links list
var links = fs.read('LINKS_LIST.txt');
var links_array = links.split("\n");
console.log("Template & Links-list loaded");

var data = "\t<H1>" + loc_title + "</H1>\n<hr />\n\t<h2>" + loc_book + " 1</h2>\n\t";
var book = 2;

for (var i_2 = links_array.length-1; i_2 >= 0; i_2--) { // phantomJS — somewhy for-of loop won't work
		var link = links_array[i_2];
		var name = link.split('/').seclast();

		// add a subdivision if next book is encountered
		if (name.indexOf("book_"+book) > -1) data = data + "\n\t<h2>" + loc_book + " " + book++ +"</h2>\n\t";
		if ((name.indexOf("coda") > -1)&&(book++ == 5)) data = data + "\n\t<h2>" + loc_coda + "</h2>\n\t";

		// clean and localize the name
		name = name.replace(/(oc_)?(the_)?curators_((book_[\d]_)|coda_)?/g, '');
		name = name.replace(/part_([\d][\d]?)/g, loc_part + ' $1');
		if (name[0].match(/[a-z]/)) {name = name[0].toUpperCase() + name.substr(1)}; // Convert first character to uppercase

		// clean and convert the link to local file instead of reddit post
		link = link.replace(/[\r\n\t]/g, '');
		link = link.replace(/(http[s]?\:\/\/[\w]{3}\.reddit\.com\/r\/HFY\/comments\/.{6}\/)([\w]+)\//g,'$2.html');
		
		// add present local links, omit missing from index
		if (fs.exists("../" + link)) {
			data = data + "<a href=\"" + link + "\">" + name + "</a>  ";
			console.log("added " + link);
		} else {
			data = data + "<a class=\"notyet\" title=\"" + loc_missing + "\" href=\"index.html\">" + name + "</a>  ";
			console.log("omitted " + link);
		}
	
		// add nice dots between chapters (parts)
		data = data.replace(/  \</g, ' • <'); 
};

data = data + "<hr />" + loc_desc + " <a href=\"https://reddit.com/u/localroger/\">" + loc_authorName + "</a>";
data = template.replace(/\$content/g, data);

fs.write("../index.html", data, 'a');
phantom.exit();