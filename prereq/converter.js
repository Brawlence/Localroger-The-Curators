"use strict";

const STYLE_DIV = "top: 5%; left: 5%; height: 90%; width: 90%; position: fixed; z-index: 255;";
const STYLE_P = "text-align: left; font-family: 'Open Sans', sans-serif; font-size: 16px; margin: 3px";
const STYLE_MD = "border-width: 3px; border-style: solid; border-color: black; width: 100%; height: 100%;";
const navParagraph = "[Первый эпизод] • [Предыдущий] • Следующий  ";
const linksFooter = "***\n\n[Зеркало на GitHub] • [Оригинал на r/HFY]\n\n[Зеркало на GitHub]: https://brawlence.github.io/Localroger-The-Curators/\n[Оригинал на r/HFY]:";

function createMDControl() {
    let mdDiv = document.body.appendChild(document.createElement('div'));
        mdDiv.id = "md";
        mdDiv.innerHTML = "<img src=\"./prereq/md-logo.svg\" class=\"bw\" onclick=\"copyMarkdownText();\" title=\"Cкопировать текст в Markdown\"></img>";
};

function copyMarkdownText() {
	if (document.getElementById('elderMagicDiv') === null) {
        let text = document.getElementsByClassName("md")[0].innerHTML;
        
        text = text.replace(/&nbsp;/g, ' ');
        text = text.replace(/\<p\>/g, '');
        text = text.replace(/\<\/p\>/g, '  ');
        text = text.replace(/\<(\/)?em\>/g, '*');
        text = text.replace(/\<span class=\"n\"\>/g, '**');
        text = text.replace(/\<\/span\>/g, '**');

        let ruAmount = text.replace(/[^ЁёА-я]/g, '').length;
        let enAmount = text.replace(/[^A-Za-z]/g, '').length;
        let completionPerc = (ruAmount*100/(enAmount+ruAmount)).toFixed(1);
        let missed = "";
        if ((completionPerc > 95) && (enAmount > 0) && (enAmount < 50)) {
            missed = text.replace(/[^A-Za-z ]/g, '').replace(/[\s]+/g, ' ');
            missed = `\nПропущенные символы: ${missed}`;
        };

        text = navParagraph + text + "\n"
             + navParagraph + "\n\n" + linksFooter + "\n\n[Первый эпизод]: \n[Предыдущий]: \n";

        const elderMagicDiv = document.body.appendChild(document.createElement('div'));
            elderMagicDiv.id = "elderMagicDiv";
			elderMagicDiv.style = STYLE_DIV;

        const percentageDisplay = elderMagicDiv.appendChild(document.createElement('p'));
            percentageDisplay.textContent = `Перевод: ${completionPerc}%`;
            percentageDisplay.title = `Кириллица:\t${ruAmount}\nЛатиница:\t${enAmount}` + missed;
            percentageDisplay.style = STYLE_P;

		const markdownText = elderMagicDiv.appendChild(document.createElement('textarea'));
			markdownText.style = STYLE_MD;
			markdownText.value = text;
	} else {
		document.getElementById('elderMagicDiv').parentElement.removeChild(document.getElementById('elderMagicDiv'));
	}
};

createMDControl();