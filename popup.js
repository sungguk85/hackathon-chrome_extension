document.getElementById("summarize").addEventListener("click", () => {
  console.log("TESTING");
});

// async function summarize() {
//   const [tab] = await chrome.tabs.query({ active: true, currentWidnow: true });

//   chrome.scripting.executeScript({
//     target: {tabId: tab.id},
//     function: getContent
//   }, async (results) => {
//     const content = results[0].summary;
//     const summary await summarizeContent(content){

//     }
//   })
// }

// function getContent() {
//     return document.body.innerText;
// }

// async function summarizeContent(content) {

// }
