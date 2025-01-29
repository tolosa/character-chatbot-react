export const chatStream = async (messages, onToken) => {
  if (import.meta.env.VITE_MOCK_RESPONSE == "true")
    return await createMockTokens(onToken);

  const openaiKey = import.meta.env.VITE_OPENAI_KEY;
  if (!openaiKey)
    throw new Error(
      "OpenAI key not found. Please set VITE_OPENAI_KEY in your .env file"
    );

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        stream: true,
      }),
    });

    if (!response.ok)
      throw new Error(`OpenAI API responded with status ${response.status}`);

    if (!response.body)
      throw new Error("ReadableStream not yet supported in this browser.");

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;

      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line === "data: [DONE]") {
            done = true;
            break;
          }

          if (line.startsWith("data: ")) {
            try {
              const json = JSON.parse(line.substring(6));
              const token = json.choices?.[0]?.delta?.content;
              if (token) onToken(token);
            } catch (err) {
              console.error("Failed to parse JSON:", err);
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error in OpenAI streaming:", error);
    throw error;
  }
};

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.".split(
    " "
  );

const createMockTokens = async (onToken) => {
  let words = 0;
  const interval = setInterval(() => {
    const randomWord = lorem[Math.round(Math.random() * lorem.length)];
    onToken(randomWord + " ");
    if (words++ >= 60) clearInterval(interval);
  }, 50);
};
