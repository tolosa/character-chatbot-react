import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const ChatBot = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log("env", import.meta.env);

  const callOpenAIStreaming = async () => {
    if (!userInput.trim()) return;

    setIsLoading(true);

    const updatedMessages = [...messages, { role: "user", content: userInput }];

    setMessages(updatedMessages);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: updatedMessages,
            stream: true,
          }),
        }
      );

      if (!response.body) {
        console.error("Streaming not supported");
        setIsLoading(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let assistantResponse = "";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "" }, // Temporary placeholder for streaming response
      ]);

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter((line) => line.trim() !== "");

          lines.forEach((line) => {
            if (line === "data: [DONE]") {
              done = true;
              return;
            }

            if (line.startsWith("data: ")) {
              try {
                const json = JSON.parse(line.substring(6)); // Parse JSON after "data: "
                const token = json.choices?.[0]?.delta?.content;

                if (token) {
                  assistantResponse += token;

                  // Update the most recent assistant message dynamically
                  setMessages((prev) =>
                    prev.map((message, index) =>
                      index === prev.length - 1
                        ? { ...message, content: assistantResponse }
                        : message
                    )
                  );
                }
              } catch (err) {
                console.error("Failed to parse JSON:", err);
              }
            }
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
      setUserInput(""); // Clear the input field
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        p: 3,
        maxWidth: 600,
        mx: "auto",
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h4" gutterBottom>
        OpenAI Chat
      </Typography>

      <Box
        sx={{
          width: "100%",
          maxHeight: 300,
          overflowY: "auto",
          p: 2,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          bgcolor: "background.default",
        }}
      >
        {messages.map((message, index) => (
          <Typography
            key={index}
            variant="body1"
            sx={{
              whiteSpace: "pre-wrap",
              textAlign: message.role === "user" ? "right" : "left",
              color: message.role === "user" ? "primary.main" : "text.primary",
              mt: 1,
            }}
          >
            <strong>{message.role === "user" ? "You:" : "Assistant:"}</strong>{" "}
            {message.content}
          </Typography>
        ))}

        {isLoading && (
          <Typography variant="body1" sx={{ mt: 1, color: "text.secondary" }}>
            Assistant is typing...
          </Typography>
        )}
      </Box>

      <TextField
        label="Type your message"
        variant="outlined"
        fullWidth
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        disabled={isLoading}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={callOpenAIStreaming}
        disabled={isLoading || !userInput.trim()}
      >
        {isLoading ? "Loading..." : "Send"}
      </Button>
    </Box>
  );
};

export { ChatBot };
