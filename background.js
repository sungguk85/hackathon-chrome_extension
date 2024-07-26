chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchContent") {
    // Process the content or make an API call if needed
    sendResponse({ data: "Processed content or result" });
  }
});
