// content.js

function getPageText() {
  let text = "";
  if (document.body) {
    text = document.body.innerText || "";
  }
  return text;
}

chrome.runtime.sendMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getPageText") {
    sendResponse({ text: getPageText() });
  }
});
