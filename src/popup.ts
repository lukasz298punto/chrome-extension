import "./style/style.css";

let disableTranslation = document.getElementById(
    "disableTranslation"
) as HTMLButtonElement;
let addTranslation = document.getElementById(
    "addTranslate"
) as HTMLButtonElement;
let buttonTranslate = document.getElementById(
    "buttonTranslate"
) as HTMLButtonElement;
let inputTranslate = document.getElementById(
    "inputTranslate"
) as HTMLInputElement;
let textTranslate = document.getElementById(
    "textTranslate"
) as HTMLParagraphElement;

const defaultLine = ".token-line,pre,h1,a";

disableTranslation.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setDisableTranslation,
    });

    disableTranslation.style.backgroundColor = "green";
});

addTranslation.addEventListener("click", () => {
    chrome.storage.sync.get("translate", (data) => {
        let translate = data.translate;

        chrome.storage.sync.set({
            translate: translate.concat(`,${inputTranslate.value}`),
        });

        setTextTranslate();
    });
});

buttonTranslate.addEventListener("click", () => {
    chrome.storage.sync.set({ translate: inputTranslate.value });
    setTextTranslate();
});

function setDisableTranslation() {
    chrome.storage.sync.get("translate", (data) => {
        let translate = data.translate;

        document.querySelectorAll(translate).forEach(function (el) {
            el.classList.add("notranslate");
        });
    });
}

function setTextTranslate() {
    chrome.storage.sync.get("translate", (data) => {
        let translate = data.translate;

        textTranslate.innerHTML = translate;
    });
}

function init() {
    chrome.storage.sync.get("translate", (data) => {
        let translate = data.translate;

        chrome.storage.sync.set({
            translate: translate || defaultLine,
        });
    });
    setTextTranslate();
}

init();
