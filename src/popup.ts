import "./style/style.css";

let disableTranslation = document.getElementById(
    "disableTranslation"
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

disableTranslation.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setDisableTranslation,
    });

    disableTranslation.style.backgroundColor = "green";
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
    chrome.storage.sync.set({ translate: ".token-line, pre, h1, a" });
    setTextTranslate();
}

init();
