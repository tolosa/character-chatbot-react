import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const MessagesList = ({ messages, isLoading }) => (
  <>
    {messages.map((message, index) => (
      <Typography
        key={index}
        variant="body1"
        sx={{
          fontSize: "1.12rem",
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
  </>
);

MessagesList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      role: PropTypes.oneOf(["user", "assistant"]).isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export { MessagesList };
