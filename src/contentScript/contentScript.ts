import { v4 as uuid } from 'uuid';
console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');


let hoverElement = null;

function captureContent(element: { innerText: any }) {
    return element.innerText;
}

function saveContent(content: any) {
    const storageData = {
        url: window.location.href,
        text: content,
        elementId: hoverElement.id,
        textId: uuid(),
        captureTime: new Date().toLocaleString(),
    };
    chrome.storage.local.get(['content'], (result) => {
        if (!result.content || result.content.length === 0) {
            const array = [];
            array.push(storageData);
            chrome.storage.local.set({ content: array });
            alert('Text Saved 🎉!');
        } else {
            const array = result.content;
            array.push(storageData);
            chrome.storage.local.set({ content: array });
            alert('Text Saved 🎉!');
        }
    });
}

function onMouseOver(event: { target: any; }) {
    const element = event.target;
    hoverElement = element;
    element.style.outline = '1px solid red';
}

function onMouseOut(event: { target: any; }) {
    const element = event.target;
    hoverElement = null;
    element.style.outline = '';
}

function onClick() {
    if (hoverElement) {
        const content = captureContent(hoverElement);
        saveContent(content);
    }
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("request on line 72", request);
        if (request.message === "run_script") {
            console.log("message received to run script!");
            document.addEventListener('mouseover', onMouseOver);
            document.addEventListener('mouseout', onMouseOut);
            document.addEventListener('click', onClick);
            alert("Extension Enabled");
            sendResponse({ "message": "received" });
        } else if (request.message === "stop_script") {
            alert("Extension Disabled");
            document.removeEventListener('mouseover', onMouseOver);
            document.addEventListener('mouseout', onMouseOut);
            document.removeEventListener('click', onClick);
            sendResponse({ "message": "received" });
        }
        return true;
    }
);
