chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: "play",
    title: "Play '%s'",
    type: 'normal',
    contexts: ['selection'],
  });
});


chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "play") {
    const text = info.selectionText;
    const url = `https://www.youtube.com/results?search_query=${text}`;
    chrome.tabs.create({ url });
  }
});
