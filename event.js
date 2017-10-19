// This function is called onload in the popup code
function getPageDetails(linkUrl) {
  // console.log('getPageDetails', linkUrl);
  // Inject the content script into the current page
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      message: 'bookmarklet',
      url: linkUrl
    });
  });
};

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "MyMotoReadSavior") {
    // console.log('context menu:', info, tab);
    getPageDetails(info.linkUrl);
  }
});
chrome.contextMenus.create({
  "title": "Save to Motoread",
  "contexts": ["link"],
  "id": 'MyMotoReadSavior'
});

/*chrome.commands.onCommand.addListener(function(command, tab) {
   console.log('Command:', command, tab);
  getPageDetails(tab.url);
});*/

chrome.commands.onCommand.addListener(function(command) { 
  console.log('Command:', command);
  if(command=="toggle"){
    chrome.tabs.query({active:true, currentWindow: true}, function(arrayOfTabs) {
      currentTabURL = arrayOfTabs[0].url;
      currentTabId = arrayOfTabs[0].id; 
      getPageDetails(currentTabURL);
    });
  }

});
chrome.browserAction.onClicked.addListener(function(tab) {
  // chrome.browserAction.setPopup({tabId:tab.id,popup:"popup.html"});
  // return false;

  //chrome.browserAction.setIcon({tabId:tab.id,path:"icon1.png"});

  //chrome.tabs.executeScript(null, {file: "popup.js"});
  // console.log('browser action:', tab);
  getPageDetails(tab.url);
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message == "checkopen"){
    var flag = false;
    chrome.windows.getAll({populate:true},function(windows){
      windows.forEach(function(window){
        window.tabs.forEach(function(tab){
          if(tab.url=="https://motoread.com/login.php"){
            flag = true;
          }
        });
      });
    });
    if (flag){
      sendResponse({message: "opened"});
    }else {
      sendResponse({message: "unopened"});
    }
  }
});
