import { useState } from "react";
import { AppBar, Box, Typography, Container } from "@mui/material";
import { chatStream } from "../lib/chatStream";
import { UserInput } from "./UserInput";

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
        height: "100vh",
      }}
    >
      <AppBar position="relative">
        <Container
          sx={{
            maxWidth: "lg",
            mx: "auto",
            display: "flex",
            alignItems: "center",
            py: 1.5,
          }}
        >
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Anime chatbot
          </Typography>
        </Container>
      </AppBar>
      <Box sx={{ flexGrow: 1, py: 2, overflowY: "scroll" }}>
        <Container
          sx={{
            maxWidth: "lg",
            mx: "auto",
          }}
        >
          {messages.map((message, index) => (
            <Typography
              key={index}
              variant="body1"
              sx={{
                whiteSpace: "pre-wrap",
                textAlign: message.role === "user" ? "right" : "left",
                color:
                  message.role === "user" ? "primary.main" : "text.primary",
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
        </Container>
      </Box>
      <Container
        sx={{
          maxWidth: "lg",
          mx: "auto",
          mb: 2,
        }}
      >
        <UserInput
          inputValue={userInput}
          isLoading={isLoading}
          onInputChange={setUserInput}
          onSendMessage={handleSend}
        />
      </Container>
    </Box>
  );
};

export { ChatBot };
