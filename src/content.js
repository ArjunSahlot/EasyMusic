chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'videoUrl') {
    for (let iframe of document.querySelectorAll('iframe.ezframe')) {
      iframe.remove();
    }

    let iframe = document.createElement('iframe');
    iframe.src = message.url;
    iframe.class = "ezframe"
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.right = '0';
    iframe.style.width = '500px';
    iframe.style.height = '120px';
    iframe.style.border = 'none';
    iframe.style.zIndex = '9999';
    document.body.appendChild(iframe);
  }
});
