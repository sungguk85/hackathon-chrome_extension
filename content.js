chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractText") {
    let content = "";
    // You can customize the text extraction logic to fit the page structure
    const paragraphs = document.getElementsByTagName("p");
    for (let i = 0; i < paragraphs.length; i++) {
      content += paragraphs[i].innerText + "\n";
    }
    sendResponse({ data: content });
  }
});
