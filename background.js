/**
 * by: tom
 * created on: 10/24/18
 * background script to detect page change
 */

// Adapted from https://stackoverflow.com/a/21668232

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(changeInfo && changeInfo.status == "complete"){
        chrome.tabs.sendMessage(tabId, {data: tab}, function(response) {

        });
    }
});