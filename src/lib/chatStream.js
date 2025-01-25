export const chatStream = async (messages, onToken) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API responded with status ${response.status}`);
    }

    if (!response.body) {
      throw new Error("ReadableStream not yet supported in this browser.");
    }

    // Read the response as a stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;

      if (value) {
        // Decode the chunk into text
        const chunk = decoder.decode(value, { stream: true });
        // Split by new line and remove empty lines
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line === "data: [DONE]") {
            // End of stream
            done = true;
            break;
          }

          if (line.startsWith("data: ")) {
            try {
              // Parse the JSON after "data: "
              const json = JSON.parse(line.substring(6));
              // Extract the streamed content token
              const token = json.choices?.[0]?.delta?.content;

              if (token) {
                // Invoke the callback with each token
                onToken(token);
              }
            } catch (err) {
              console.error("Failed to parse JSON:", err);
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error in OpenAI streaming:", error);
    throw error; // re-throw to handle it in the caller
  }
};
