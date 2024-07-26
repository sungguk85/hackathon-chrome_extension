document
  .getElementById("summarizeButton")
  .addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        files: ["content.js"],
      },
      async () => {
        chrome.tabs.sendMessage(
          tab.id,
          { action: "extractText" },
          async (response) => {
            if (response && response.data) {
              const content = response.data;
              try {
                const summary = await getSummary(content);
                document.getElementById("summary").innerText = summary;
              } catch (error) {
                console.error("Error getting summary:", error);
                document.getElementById("summary").innerText =
                  "Error fetching summary.";
              }
            } else {
              document.getElementById("summary").innerText =
                "Failed to extract text.";
            }
          }
        );
      }
    );
  });

async function getSummary(text) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer sk-None-0e3pVNru421NRuPFQfRIT3BlbkFJQg4ivqSwNE3aHbe8FPSW`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Please summarize the following text:\n\n${text}`,
          },
        ],
        max_tokens: 100,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content.trim();
    } else {
      throw new Error("Unexpected API response format");
    }
  } catch (error) {
    console.error("Error fetching summary:", error);
    return "Error fetching summary.";
  }
}

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
