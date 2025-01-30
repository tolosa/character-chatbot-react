import { TextField, IconButton, Icon } from "@mui/material";
import PropTypes from "prop-types";

const UserInput = ({ inputValue, isLoading, onInputChange, onSendMessage }) => (
  <TextField
    label="Ask Luffy"
    fullWidth
    value={inputValue}
    disabled={isLoading}
    onChange={(e) => onInputChange(e.target.value)}
    onKeyDown={(e) => e.key == "Enter" && onSendMessage(inputValue)}
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
);

UserInput.propTypes = {
  inputValue: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSendMessage: PropTypes.func.isRequired,
};

export { UserInput };
