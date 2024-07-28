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
              const language = document.getElementById("languageSelect").value;
              try {
                const summary = await getSummary(content, language);
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

// document.getElementById("toggleTheme").addEventListener("click", () => {
//   document.body.classList.toggle("dark-mode");
// });
async function getSummary(text, language) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer sk-None-nWDOY8T0rAPEfhsihO7OT3BlbkFJgYp0o63WNE2isyippglG`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Please summarize the following text in ${language}:\n\n${text}`,
          },
        ],
        max_tokens: 150,
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
