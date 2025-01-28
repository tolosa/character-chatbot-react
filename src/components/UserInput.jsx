import { TextField, Button } from "@mui/material";

const UserInput = ({ inputValue, isLoading, onInputChange, onSendMessage }) => {
  return (
    <>
      <TextField
        label="Type your message"
        variant="outlined"
        fullWidth
        value={inputValue}
        disabled={isLoading}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSendMessage(inputValue)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onSendMessage}
        disabled={isLoading || !inputValue.trim()}
      >
        {isLoading ? "Loading..." : "Send"}
      </Button>
    </>
  );
};

export { UserInput };
