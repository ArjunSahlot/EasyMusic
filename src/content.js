function makeDraggable(element) {
  element.onmousedown = enableDrag;

  let mouseOffsetX = 0,
    mouseOffsetY = 0;

  function getMouseOffset() {
    var e = window.event;

    return {
      X: e.clientX - element.offsetLeft,
      Y: e.clientY - element.offsetTop,
    };
  }

  function enableDrag() {
    document.onmouseup = disableDrag;
    document.onmousemove = dragElement;

    mouseOffsetX = getMouseOffset().X;
    mouseOffsetY = getMouseOffset().Y;
  }

  function dragElement() {
    var e = window.event;
    e.preventDefault();

    var mouseX = e.clientX;
    var mouseY = e.clientY;

    var newX = mouseX - mouseOffsetX;
    var newY = mouseY - mouseOffsetY;

    element.style.left =
      Math.max(
        10,
        Math.min(
          newX,
          document.documentElement.clientWidth - element.offsetWidth - 10,
        ),
      ) + "px";
    element.style.top =
      Math.max(
        10,
        Math.min(
          newY,
          document.documentElement.clientHeight - element.offsetHeight - 10,
        ),
      ) + "px";
  }

  function disableDrag() {
    var e = window.event;
    e.preventDefault();

    document.onmouseup = null;
    document.onmousemove = null;
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "videoUrl") {
    // draggable div
    let div = document.createElement("div");
    div.id = "ezdrag";
    div.style.border = "1px solid silver";
    div.style.borderRadius = "3px";
    div.style.boxShadow = "0 0 4px #afafaf";
    div.style.padding = "15px";
    div.style.position = "fixed";
    div.style.cursor = "move";
    div.style.top = "0";
    div.style.right = "0";
    div.style.width = "fit-content";
    div.style.height = "fit-content";
    div.style.zIndex = "9999";
    document.body.appendChild(div);

    // iframe video
    let iframe = document.createElement("iframe");
    iframe.src = message.url;
    iframe.style.width = "560px";
    iframe.style.height = "120px";
    div.appendChild(iframe);

    // close button
    let close = document.createElement("img");
    close.src = "https://www.svgrepo.com/show/350281/close.svg";
    close.style.position = "absolute";
    close.style.top = "0";
    close.style.right = "0";
    close.style.width = "16px";
    close.style.aspectRatio = "1";
    close.style.cursor = "pointer";
    close.style.backgroundColor = "white";
    close.onclick = () => {
      iframe.contentWindow.postMessage(
        '{"event":"command","func":"stopVideo","args":""}',
        "*",
      );
      div.removeChild(iframe);
      div.remove();
    };
    div.appendChild(close);

    makeDraggable(div);
  }
});
