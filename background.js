//background js for ChaGPT API
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "Get Summary") {
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer sk-None-GUTdvafNO369GOZKogm9T3BlbkFJiydcsjnnHi4ImK7ME0r3",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        prompt: "requet.text",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        sendResponse({ summary: data.choices[0].text });
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }
});
