chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // console.log('motoread content script:', request);
  if (request.message == 'bookmarklet') {

    //Creating Elements
    var d = document.createElement("div");
    d.setAttribute('class', 'alert-wrap');
    var str = '<h3>motoread</h3><span class="Saving">Saving...</span><span class="ext-close"></span>';

    d.innerHTML = str;
    document.body.appendChild(d);
    var checkstatus;
    var firsttime = true;
    //////////////////////////
    var xhr = new XMLHttpRequest();
    var saveURL = function() {
      var postUrl = 'https://motoread.com/user_status.php';

      // Set up an asynchronous AJAX POST request
      
      xhr.open('GET', postUrl, true);
      xhr.onreadystatechange = function() {
        // If the request completed
        // console.log(xhr.readyState);
        if (xhr.readyState == 4) {
          //statusDisplay.innerHTML = '';
          if (xhr.status == 200) {
            // If it was a success, close the popup after a short delay
            if (xhr.responseText == 'loggedout') {
              var contentUrl = encodeURIComponent(request.url);
              //and then
              //openInNewTab("https://motoread.com/login.php");
              if (firsttime){
                firsttime = false;
                openInNewTab('https://motoread.com/login.php?save=' + contentUrl);
                saveURL();
              } else {
                saveURL();
              }
              /*chrome.runtime.sendMessage({message: "checkopen"}, function(response) {
                console.log(response);
                if (response.openstatus == "opened"){
                  saveURL();
                }else if(response.openstatus == "nonopened"){
                  openInNewTab("https://motoread.com/login.php");
                  saveURL();
                }
              });*/
              //contentUrl = 'https://motoread.com/login.php?save=' + contentUrl;
              //window.location.href = contentUrl;
            } else {
              var contentUrl = encodeURIComponent(request.url);
              contentUrl = 'https://motoread.com/save.php?url=' + contentUrl;
              savePageUrl(contentUrl, d);
            }
          } else {

          }
        }
      };

      //     // Send the request and set status
      xhr.send();
    };
    saveURL();
    
    ///////////////////////
    var elem = document.getElementsByClassName("alert-wrap");
    var d = document.getElementsByClassName('alert-wrap')[0].getElementsByClassName('ext-close')[0];
    d.onclick = function() {
      xhr.abort();
      var str = '<h3>motoread</h3><span class="Saving">Stopped Saving Article </span><span class="ext-close"></span>';
      elem[0].innerHTML = str;
      setTimeout(function() {
        while (elem[0]) {
          elem[0].parentNode.removeChild(elem[0]);
        }
      }, 3000);
    }
  }
});
function openInNewTab(url) {
    var a = document.createElement("a");
    a.target = "_blank";
    a.href = url;
    a.click();
}


function savePageUrl(url, d) {
  // alert();
  var elem = document.getElementsByClassName("alert-wrap");
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send();
  xhr.onreadystatechange = function() {
    // If the request completed
    // console.log(xhr.readyState);
    if (xhr.readyState == 4) {
      //statusDisplay.innerHTML = '';
      if (xhr.status == 200) {
        // If it was a success, close the popup after a short delay
        if (xhr.responseText == 'Saved to Playlist') {
          // alert('Article Saved');

          var str = '<h3>motoread</h3><span class="Saving">SAVED</span><span class="ext-close"></span>';
          elem[0].innerHTML = str;
          setTimeout(function() {
            while (elem[0]) {
              elem[0].parentNode.removeChild(elem[0]);
            }
          }, 3000);

        } else if (xhr.responseText === 'Added to Playlist') {
          var str = '<h3>motoread</h3><span class="Saving">Already Saved </span><span class="ext-close"></span>';
          elem[0].innerHTML = str;
          setTimeout(function() {
            while (elem[0]) {
              elem[0].parentNode.removeChild(elem[0]);
            }
          }, 3000);
        } else if (xhr.responseText === 'Article Save Error' || xhr.responseText === 'Content not found in URL') {
          var str = '<h3>motoread</h3><span class="Saving">Cannot Save Article, there was an error.</span><span class="ext-close"></span>';
          elem[0].innerHTML = str;
          setTimeout(function() {
            while (elem[0]) {
              elem[0].parentNode.removeChild(elem[0]);
            }
          }, 3000);
        }
      }
    }
  }
}
