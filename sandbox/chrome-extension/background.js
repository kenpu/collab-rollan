function something(tabId, changeInfo, tab) {
    console.debug("switching on title:", tab.title)
    if(1) {
        chrome.pageAction.show(tabId);
    }
}

chrome.tabs.onUpdated.addListener(something);