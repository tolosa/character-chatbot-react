import { useState } from "react";
import { Box, Container } from "@mui/material";
import { chatStream } from "../lib/chatStream";
import { UserInput } from "./UserInput";
import { MessagesList } from "./MessagesList";
import { Welcome } from "./Welcome";
import { Header } from "./Header";

const systemPrompt =
  "Pretend to be Monkey D. Luffy, the protagonist of the One Piece anime and manga.";

const initialMessages = [{ role: "developer", content: systemPrompt }];

const ChatBot = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [userInput, setUserInput] = useState("");
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

  const handleOnPromptClick = (prompt) => {
    setUserInput(prompt);
    handleSend(prompt);
  };

  const handleOnNewConversation = () => {
    setMessages(initialMessages);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Header
        onNewConversationClick={
          !!userMessages.length && handleOnNewConversation
        }
      />
      <Box sx={{ flexGrow: 1, overflowY: "scroll", display: "flex" }}>
        <Container sx={{ maxWidth: "lg", mx: "auto", py: 3 }}>
          {userMessages.length ? (
            <MessagesList messages={userMessages} isLoading={isLoading} />
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
          onSendMessage={handleSend}
        />
      </Container>
    </Box>
  );
};

export { ChatBot };
