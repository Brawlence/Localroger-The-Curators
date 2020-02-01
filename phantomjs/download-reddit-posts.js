"use strict";

var fs = require('fs');

//TODO: Fix this to actually fetch all the links
function dumpLinksTo(outputFileName) {
	var where_to_look = [	"https://old.reddit.com/user/localroger/submitted/", 
							"https://old.reddit.com/user/localroger/submitted/?count=25&after=t3_comens", 
							"https://old.reddit.com/user/localroger/submitted/?count=50&after=t3_aowl0k", 
							"https://old.reddit.com/user/localroger/submitted/?count=75&after=t3_92owaa",
							"https://old.reddit.com/user/localroger/submitted/?count=100&after=t3_7wogam"];
	
	var links_array = document.querySelectorAll("a[href*='curators'].title");
	var links_text = '';
	for (var i = 0; i < links_array.length; i++) {
		links_text = links_text + links_array[i].href + "\n";
	};
	try {
		fs.write(outputFileName, links_text, 'w');
		console.log("strings written to " + outputFileName);
	} catch (error) {
		console.log(e);
	}
}

function loadlinksFrom(file) {
	var content = fs.read(file);
	var array = content.split("\n");
	return array;
}

function dumpTo(fileName, data, originURL) {
	data = data.replace(/(http[s]?\:\/\/[\w]{3}\.reddit\.com\/r\/HFY\/comments\/.{6}\/)([\w]+)\//g,'$2.html');
	data = "<html><head></head><body>" + data + "<div id=\"footer\">SOURCE URL: <a href=\"" + originURL + "\"> " + originURL + " </a></div></body><html>";
	fs.write(fileName + ".html", data, 'w');
}

/*
Saves given urls to files
@param array of URLs to render
@param callbackPerUrl Function called after finishing each URL, including the last URL
@param callbackFinal Function called after finishing everything
*/
function downloadPostToFiles (urls, callbackPerUrl, callbackFinal) {
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
                        var originURL =  page.evaluateJavaScript('function(){return document.URL;}');
						var HTMLcontent = page.evaluateJavaScript('function(){return document.querySelector(\'div.expando div.usertext-body\').innerHTML;}');
						var splotted = originURL.split('/');
						var name = splotted[splotted.length-2];
						dumpTo(name, HTMLcontent, originURL);			

                        return next(status, url);
                    }), 3000);
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

//dumpLinksTo("LINKS_LIST.txt");
var URL_array = loadlinksFrom("LINKS_LIST.txt");

downloadPostToFiles(
	URL_array,
	(function(status, url) {
		if (status !== "success") {
			return console.log("Unable to dump '" + url + "'");
		} else {
			return console.log("Dumped post " + url);
		}
	}),
	function() {return phantom.exit();}
);
