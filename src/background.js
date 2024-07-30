chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: "play",
    title: "Play '%s'",
    type: "normal",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "play") {
    const text = info.selectionText;

    let query = text + " official audio";
    await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=AIzaSyBMhIwjKMlkz0QLnaCnnnc1Ey1za2GYd_8&maxResults=1`,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          let videoId = data.items[0].id.videoId;
          chrome.tabs.sendMessage(tab.id, {
            type: "videoUrl",
            url: `https://www.youtube.com/embed/${videoId}`,
          });
        }
      });
  }
});
