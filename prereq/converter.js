"use strict";

function createMDControl() {
    var mdDiv = document.createElement('div');
        mdDiv.id = "md";
        mdDiv.innerHTML = "<img src=\"./prereq/md-logo.svg\" onclick=\"copyMarkdownText();\" title=\"Cкопировать текст в Markdown\"></img>";
    document.body.appendChild(mdDiv);
};

function copyMarkdownText() {
	if (document.getElementById('elderMagicField') === null) {
        var text = document.getElementsByClassName("md")[0].innerHTML;
        
        text = text.replace(/\<p\>/g, '');
        text = text.replace(/\<\/p\>/g, '  ');
        text = text.replace(/\<(\/)?em\>/g, '*');
        text = text.replace(/\<span class=\"n\"\>/g, '**');
        text = text.replace(/\<\/span\>/g, '**');

		const elderMagicField = document.createElement('textarea');
			elderMagicField.id = "elderMagicField";
			elderMagicField.style = "top: 5%; left: 5%; height: 90%; width: 90%; position: fixed; z-index: 255;  border-width: 3px; border-style: solid; border-color: black;";
			elderMagicField.value = text;
		document.body.appendChild(elderMagicField);
	} else {
		document.getElementById('elderMagicField').parentElement.removeChild(document.getElementById('elderMagicField'));
	}
};

createMDControl();