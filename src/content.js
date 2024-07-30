chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'videoUrl') {
    // create a floating video player that plays the video
    let iframe = document.createElement('iframe');
    iframe.src = message.url;
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.right = '0';
    iframe.style.width = '500px';
    iframe.style.height = '50px';
    iframe.style.border = 'none';
    iframe.style.zIndex = '9999';
    document.body.appendChild(iframe);
  }
});
