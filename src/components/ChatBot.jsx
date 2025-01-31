import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { useChatbot } from "../lib/chatStream";
import { UserInput } from "./UserInput";
import { MessagesList } from "./MessagesList";
import { Welcome } from "./Welcome";
import { Header } from "./Header";

const systemPrompt =
  "Pretend to be Monkey D. Luffy, the protagonist of the One Piece anime and manga.";

const ChatBot = () => {
  const [userInput, setUserInput] = useState("");
  const { messages, isLoading, sendMessage, clear } = useChatbot({
    systemPrompt,
  });

  useEffect(() => {
    if (!isLoading) setUserInput("");
  }, [isLoading]);

  const handleOnPromptClick = async (prompt) => {
    setUserInput(prompt);
    sendMessage(prompt);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Header onNewConversationClick={!!messages.length && clear} />
      <Box sx={{ flexGrow: 1, overflowY: "scroll", display: "flex" }}>
        <Container sx={{ maxWidth: "lg", mx: "auto", py: 3 }}>
          {messages.length ? (
            <MessagesList messages={messages} isLoading={isLoading} />
          ) : (
            <Welcome onPromptClick={handleOnPromptClick} />
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
          onSendMessage={sendMessage}
        />
      </Container>
    </Box>
  );
};

export { ChatBot };
