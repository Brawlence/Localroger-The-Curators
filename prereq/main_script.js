"use strict";

var clickEvent = "ontouchstart" in window ? "touchend" : "click",
    classMethods = ["remove", "add"],
    stringArray = [ "Добавить контраста",
                    "Убрать контраст",
                    "Ночной режим",
                    "Обычный режим",
                    "Добавить засечки",
                    "Убрать засечки" ];

function createControls() {
    var contrastDiv = document.createElement('div');
        contrastDiv.id = "contrast";
        contrastDiv.innerText = stringArray[0];

    var nightmodeDiv = document.createElement('div');
        nightmodeDiv.id = "invmode";
        nightmodeDiv.innerText = stringArray[2];

    var serifDiv = document.createElement('div');
        serifDiv.id = "serif";
        serifDiv.innerText = stringArray[4];

    document.body.appendChild(serifDiv);
    document.body.appendChild(contrastDiv);
    document.body.appendChild(nightmodeDiv);
}

function someControl(id, textArr, className) {
    var el = document.getElementsByTagName("html")[0];
    var acbox = document.getElementById(id),
        textNode = acbox.firstChild;
    acbox.addEventListener(
        clickEvent,
        function() {
            var selector = Number(localStorage.getItem(id)!=='true');
            localStorage.setItem(id, Boolean(selector));
            textNode.data = textArr[selector];
            el.classList[classMethods[selector]](className);
        },
        false
    );
}

function addSerifControl() {
    someControl("serif", [stringArray[4], stringArray[5]], "serif");
}

function addContrastControl() {
    someControl("contrast", [stringArray[0], stringArray[1]],"contrast");
}

function addInvertedControl() {
    someControl("invmode", [stringArray[2], stringArray[3]], "inverted");
}

createControls();
if (localStorage.getItem('serif')==='true') {
    document.getElementById('serif').firstChild.data = stringArray[5];
    document.getElementsByTagName("html")[0].classList.add("serif");
}
if (localStorage.getItem('invmode')==='true') {
    document.getElementById('invmode').firstChild.data = stringArray[3];
    document.getElementsByTagName("html")[0].classList.add("inverted");
}
if (localStorage.getItem('contrast')==='true') {
    document.getElementById('contrast').firstChild.data = stringArray[1];
    document.getElementsByTagName("html")[0].classList.add("contrast");
}
addContrastControl();
addInvertedControl();
addSerifControl();