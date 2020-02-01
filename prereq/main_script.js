"use strict";

var documentElement = document.getElementsByTagName("html")[0],
    clickEvent = "ontouchstart" in window ? "touchend" : "click",
    classMethods = ["remove", "add"];

function someControl(id, textArr, className) {
    var el = document.getElementsByTagName("html")[0];
    var acbox = document.getElementById(id),
        textNode = acbox.firstChild,
        toggled = false;
    acbox.addEventListener(
        clickEvent,
        function() {
            var selector = Number((toggled = !toggled));
            textNode.data = textArr[selector];
            el.classList[classMethods[selector]](className);
        },
        false
    );
}

function addContrastControl() {
    someControl("contrast", ["Добавить контраста", "Убрать контраст"],"contrast");
}

function addInvertedControl() {
    someControl("invmode", ["Ночной режим", "Обычный режим"], "inverted");
}

addContrastControl();
addInvertedControl();