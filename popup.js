// // This callback function is called when the content script has been
// // injected and returned its results
// function onPageDetailsReceived(pageDetails)  {
// console.log(pageDetails);
//     document.getElementById('title').value = pageDetails.title;
//     document.getElementById('url').value = pageDetails.url;
//     document.getElementById('summary').innerText = pageDetails.summary;
// }

// // Global reference to the status display SPAN
// var statusDisplay = null;

// // POST the data to the server using XMLHttpRequest
// function addBookmark() {
//     // Cancel the form submit
//     event.preventDefault();

//     // The URL to POST our data to
var postUrl = 'https://motoread.com/user_status.php';

// Set up an asynchronous AJAX POST request
var xhr = new XMLHttpRequest();
xhr.open('GET', postUrl, true);

//     // Prepare the data to be POSTed by URLEncoding each field's contents
//      var title = encodeURIComponent(document.getElementById('title').value);
//      var url = encodeURIComponent(document.getElementById('url').value);
//     // var summary = encodeURIComponent(document.getElementById('summary').value);
//     // var tags = encodeURIComponent(document.getElementById('tags').value);
//     // var e =encodeURIComponent('sonu_kumar@esferasoft.com');
//     // var p=encodeURIComponent('12345');
//     // var params = 'title=' + title +
//     //              '&url=' + url +
//     //              '&summary=' + summary +
//     //              '&tags=' + tags;

//     // var loginParams='email='+e+'&pwd='+p;

//     // // Replace any instances of the URLEncoded space char with +
//     // params       = params.replace(/%20/g, '+');
//     // loginParams  = loginParams.replace(/%20/g, '+');

//     // // Set correct header for form data
//     // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

//     // Handle request state change events
xhr.onreadystatechange = function() {
  // If the request completed
  // console.log(xhr.readyState);
  if (xhr.readyState == 4) {
    statusDisplay.innerHTML = '';
    if (xhr.status == 200) {
      // If it was a success, close the popup after a short delay
      if (xhr.responseText == 'loggedout') {
        alert('I am loggedout');
        var url = 'https://motoread.com/login.php?save=' + url;
        //chrome.runtime.sendMessage({redirect: url});
        chrome.runtime.getBackgroundPage(function(eventPage) {
          // Call the getPageInfo function in the event page, passing in
          // our onPageDetailsReceived function as the callback. This injects
          // content.js into the current tab's HTML
          eventPage.getRedirectUrl();
        });
      } else {
        alert('I am logged in');
        alert(tab.url);
        var postUrl = ;
        //xhr.open('GET', postUrl, true);
        //             var r = JSON.parse(xhr.responseText);
        //             var s=r.status;
        //             if (s=='success') {alert(r.token);}
        //             console.log(r.email);
        //             console.log(r.token);
        //             // chrome.storage.sync.set({"sess": r.token,"id":r.user_id}, function() {
        //             //                   message('Settings saved');
        //             //                 });

        //             statusDisplay.innerHTML = 'Login successful!';
        //             chrome.storage.sync.get("sess", function(items) {
        //               alert('Settings retrieved::::'+items);
        //               alert('Settings retrieved::::'+items.sess);
        // });
        //             chrome.storage.sync.get("id", function(items) {
        //               alert('Settings retrieved::::'+items);
        //               alert('Settings retrieved::::'+items.id);

        // });
      }
      //window.setTimeout(window.close, 1000);
    } else {
      // Show what went wrong
      statusDisplay.innerHTML = 'Error saving: ' + xhr.statusText;
    }
  }
};

//     // Send the request and set status
xhr.send();
//     statusDisplay.innerHTML = 'Saving...';
// }

// // When the popup HTML has loaded
// window.addEventListener('load', function(evt) {
//     // Cache a reference to the status display SPAN
//     statusDisplay = document.getElementById('status-display');
//     // Handle the bookmark form submit event with our addBookmark function
//     document.getElementById('addbookmark').addEventListener('submit', addBookmark);
//     // Get the event page
//     chrome.runtime.getBackgroundPage(function(eventPage) {
//         // Call the getPageInfo function in the event page, passing in
//         // our onPageDetailsReceived function as the callback. This injects
//         // content.js into the current tab's HTML
//         eventPage.getPageDetails(onPageDetailsReceived);
//     });
// });
alert();
