"use strict";

const DIV_STYLE = "top: 5%; left: 5%; height: 90%; width: 90%; position: fixed; z-index: 255; text-align: left; font-family: 'Open Sans', sans-serif; font-size: 16px;";
const TEXTAREA_STYLE = "border-width: 3px; border-style: solid; border-color: black; width: 100%; height: 100%;";

function createMDControl() {
    let mdDiv = document.body.appendChild(document.createElement('div'));
        mdDiv.id = "md";
        mdDiv.innerHTML = "<img src=\"./prereq/md-logo.svg\" class=\"bw\" onclick=\"copyMarkdownText();\" title=\"Cкопировать текст в Markdown\"></img>";
};

function copyMarkdownText() {
	if (document.getElementById('elderMagicField') === null) {
        let text = document.getElementsByClassName("md")[0].innerHTML;
        
        text = text.replace(/\<p\>/g, '');
        text = text.replace(/\<\/p\>/g, '  ');
        text = text.replace(/\<(\/)?em\>/g, '*');
        text = text.replace(/\<span class=\"n\"\>/g, '**');
        text = text.replace(/\<\/span\>/g, '**');

        let ruAmount = text.replace(/[^ЁёА-я]/g, '').length;
        let enAmount = text.replace(/[^A-z]/g, '').length;
        let completionPerc = (ruAmount*100/(enAmount+ruAmount)).toFixed(1);

        text = "[Первый эпизод] • [Предыдущий] • Следующий  \n\n" + text + "[Первый эпизод] • [Предыдущий] • Следующий  \n\n***\n\n[Зеркало на GitHub] • [Оригинал на r/HFY]\n\n[Зеркало на GitHub]: https://brawlence.github.io/Localroger-The-Curators/\n[Оригинал на r/HFY]:\n\n[Первый эпизод]: \n[Предыдущий]: \n";

        const elderMagicDiv = document.body.appendChild(document.createElement('div'));
            elderMagicDiv.id = "elderMagicDiv";
			elderMagicDiv.style = DIV_STYLE;
            elderMagicDiv.textContent = "Прогресс перевода: " + completionPerc + "%; кириллических символов: " + ruAmount + ", латинских символов: " +  enAmount;

		const elderMagicField = elderMagicDiv.appendChild(document.createElement('textarea'));
			elderMagicField.id = "elderMagicField";
			elderMagicField.style = TEXTAREA_STYLE;
			elderMagicField.value = text;
	} else {
		document.getElementById('elderMagicDiv').parentElement.removeChild(document.getElementById('elderMagicDiv'));
	}
};

createMDControl();