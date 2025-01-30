import { useState } from "react";
import { AppBar, Box, Typography, Container } from "@mui/material";
import { chatStream } from "../lib/chatStream";
import { UserInput } from "./UserInput";
import { MessagesList } from "./MessagesList";
import { Welcome } from "./Welcome";

const systemPrompt =
  "Pretend to be Monkey D. Luffy, the protagonist of the One Piece anime and manga.";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { role: "developer", content: systemPrompt },
  ]);
  const [userInput, setUserInput] = useState("Who are you?");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (prompt = userInput) => {
    if (!prompt.trim()) return;
    setIsLoading(true);

    const updatedMessages = [...messages, { role: "user", content: prompt }];
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

  const userMessages = messages.toSpliced(0, 1);

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
            Anime Chatbot
          </Typography>
        </Container>
      </AppBar>
      <Box sx={{ flexGrow: 1, py: 2, overflowY: "scroll", display: "flex" }}>
        <Container sx={{ maxWidth: "lg", mx: "auto" }}>
          {userMessages.length ? (
            <MessagesList messages={userMessages} isLoading={isLoading} />
          ) : (
            <Welcome onPromptClick={handleSend} />
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
