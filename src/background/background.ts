var isInject: boolean = false;
chrome.runtime.onInstalled.addListener((reason: any) => {
    console.log('I just installed with new version');
    if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
        checkCommandShortcuts();
    }
});
const checkCommandShortcuts = () => {
    chrome.commands.getAll((commands) => {
        let missingShortcuts = [];

        for (let { name, shortcut } of commands) {
            if (shortcut === '') {
                missingShortcuts.push(name);
            }
        }
        if (missingShortcuts.length > 0) {
            alert(`You have not set shortcuts for the following commands: ${missingShortcuts.join(', ')}. Please set them in the extension's options page.`);
        }
    });
}
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