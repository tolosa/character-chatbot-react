import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { chatStream } from "../lib/chatStream";

const ChatBot = () => {
  const [userInput, setUserInput] = useState("Who are you?");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!userInput.trim()) return;
    setIsLoading(true);

    const updatedMessages = [...messages, { role: "user", content: userInput }];
    setMessages(updatedMessages);
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      await chatStream(updatedMessages, (token) => {
        setMessages((prev) =>
          prev.map((message, index) =>
            index === prev.length - 1
              ? { ...message, content: message.content + token }
              : message
          )
        );
      });
    } catch (error) {
      console.error("Error while calling OpenAI:", error);
    } finally {
      setIsLoading(false);
      setUserInput("");
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
        disabled={isLoading}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSend}
        disabled={isLoading || !userInput.trim()}
      >
        {isLoading ? "Loading..." : "Send"}
      </Button>
    </Box>
  );
};

export { ChatBot };
