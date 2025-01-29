import { TextField, IconButton, Icon } from "@mui/material";

const UserInput = ({ inputValue, isLoading, onInputChange, onSendMessage }) => {
  return (
    <>
      <TextField
        label="Your message"
        fullWidth
        value={inputValue}
        disabled={isLoading}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSendMessage(inputValue)}
        slotProps={{
          input: {
            sx: { borderRadius: 3 },
            endAdornment: (
              <IconButton
                edge="end"
                onClick={() => onSendMessage(inputValue)}
                disabled={isLoading || !inputValue.trim()}
              >
                <Icon>send</Icon>
              </IconButton>
            ),
          },
        }}
      />
    </>
  );
};

export { UserInput };
