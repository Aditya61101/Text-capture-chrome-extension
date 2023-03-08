var isInject: boolean = false;
chrome.runtime.onInstalled.addListener(() => {
    console.log('I just installed with new version');
});

const stopScript = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { "message": "stop_script" }, (response) => {
            if (!chrome.runtime.lastError) {
                console.log("message send to run script1!");
                console.log(response.message);
            } else {
                console.log(chrome.runtime.lastError);
                console.log("message send to run script2!");
            }
        });
    });
}
const startScript = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { "message": "run_script" }, (response) => {
            if (!chrome.runtime.lastError) {
                console.log("message send to run script1!");
                console.log(response.message);
            } else {
                console.log(chrome.runtime.lastError);
                console.log("message send to run script2!");
            }
        });
    });
}
chrome.commands.onCommand.addListener((command) => {
    console.log(`Command: ${command}`);
    if (command === 'content-script') {
        isInject = !isInject;
        if (isInject) {
            startScript();
        }
        else {
            stopScript();
        }

    }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("request on line 47");
    if (request.message === "inject_false") {
        isInject = false;
        stopScript();
    } else if (request.message === "inject_true") {
        isInject = true;
        startScript();
    }
    return true;
})