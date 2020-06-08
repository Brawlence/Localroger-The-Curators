"use strict";

// localization strings
var	loc_HTML_lang = "en",
	loc_HTML_desc = "The Sci-Fi HFY soap opera by Roger Williams",
	loc_title = "The Curators",
	loc_index = "INDEX",
	loc_source = "SOURCE post on HFY";

var fs = require('fs');

function loadlinksFrom(file) {
	console.log(file + " loaded")
	var content = fs.read(file);
	var array = content.split("\n");
	return array;
};

function dumpTo(fileName, data, nav, originURL) {
	// read and localize the template
	var template = fs.read("template.html"); 
	template = template.replace(/\$lang/g, loc_HTML_lang);
	template = template.replace(/\$title/g, loc_title);
	template = template.replace(/\$description/g, loc_HTML_desc);

	data = nav + "\n" +  data + nav;
	data = data.replace(/\<hr\>/g,'<hr />');
	data = data.replace(/(http[s]?\:\/\/[\w]{3}\.reddit\.com\/r\/HFY\/comments\/.{6}\/)([\w]+)\//g,'$2.html');
	data = template.replace(/\$content/g, data + "\n<hr />\n<div id=\"footer\">\n\t<a style=\"float:left;\"href=\"index.html\">[ " + loc_index + " ]</a>\n\t<a style=\"float:right;\"href=\"" + originURL + "\">[ " + loc_source + " ]</a>\n</div>");
	fs.write("..\\" + fileName + ".html", data, 'w');
};

var drp = {
	report: function(status, url) {
		if (status !== "success") {
			return console.log("Unable to process " + url);
		} else {
			return console.log("Processed post " + url);
		}
	},

	fetchLinks: function (page) {
		var content = page.evaluate(
								function(){
									var links_text = '';
									var links_array = document.querySelectorAll("a[href*=\'curators\'].title");
									for (var i = 0; i < links_array.length; i++) {
										if (links_array[i] !== null) links_text = links_text + links_array[i].href + "\n";
									};
									return links_text;
									}
								); 
		try {
			fs.write("LINKS_LIST.txt", content, 'a');
			console.log("block of links written");
		} catch (error) {
			console.log(e);
		}
	},

	grabPostContent: function(page) {
		var originURL =  page.evaluateJavaScript('function(){return document.URL;}');
		var navParagraph = page.evaluateJavaScript('function(){return document.querySelector(\'div.expando div.usertext-body p a\').parentElement.outerHTML}');
		navParagraph = navParagraph.replace(/\-\-/g, '•');
		var HTMLcontent = page.evaluateJavaScript('function(){document.querySelector(\'div.expando div.usertext-body p a\').parentElement.remove(); return document.querySelector(\'div.expando div.usertext-body\').innerHTML;}');
		var splotted = originURL.split('/');
		var name = splotted[splotted.length-2];
		dumpTo(name, HTMLcontent, navParagraph, originURL);			
	}
};

/*
Processes given array of URLs by a given method
@param array of URLs to render
@param actionsToDo Function called on every hop, dictates what to do on each page
@param callbackPerUrl Function called after finishing each URL, including the last URL
@param callbackFinal Function called after finishing everything
*/
function processListOfURLS (urls, actionsToDo, callbackPerUrl, callbackFinal) {
    var next, page, retrieve, webpage;
    webpage = require("webpage");
    page = null;
    next = function(status, url) {
        page.close();
        callbackPerUrl(status, url);
        return retrieve();
    };
    retrieve = function() {
        var url;
        if (urls.length > 0) {
            url = urls.shift();
            page = webpage.create();
            page.settings.userAgent = "Phantom.js bot";
            return page.open(url, function(status) {
                if (status === "success") {
                    return window.setTimeout((function() {
						actionsToDo(page);
                        return next(status, url);
                    }), 1000);
                } else {
                    return next(status, url);
                }
            });
        } else {
            return callbackFinal();
        }
    };
    return retrieve();
};

var where_to_look = [	"https://old.reddit.com/user/localroger/submitted/", 
						"https://old.reddit.com/user/localroger/submitted/?count=25&after=t3_dnjbdx", 
						"https://old.reddit.com/user/localroger/submitted/?count=50&after=t3_bffw84", 
						"https://old.reddit.com/user/localroger/submitted/?count=75&after=t3_9nx0li",
						"https://old.reddit.com/user/localroger/submitted/?count=100&after=t3_8fmaqj",
						"https://old.reddit.com/user/localroger/submitted/?count=125&after=t3_7dt7uy"];

// Easier to just run
// for (link of document.querySelectorAll('div#siteTable a.title')) console.log(link.href)
// on each page of https://old.reddit.com/user/localroger/submitted/ and add it to LINKS_LIST.txt
// //processListOfURLS(where_to_look, drp.fetchLinks, drp.report, function() {return console.log("completed link fetching");});

var URL_array = loadlinksFrom("LINKS_LIST.txt");

processListOfURLS(URL_array, drp.grabPostContent, drp.report, function() {return phantom.exit();});
