import { Avatar, Typography } from "@mui/material";
import PropTypes from "prop-types";

const MessagesList = ({ messages, isLoading }) =>
  messages.map((message, index) => (
    <Typography
      key={index}
      sx={{
        fontSize: "1.15rem",
        whiteSpace: "pre-wrap",
        display: "flex",
        flexDirection: message.role === "user" ? "row-reverse" : "row",
        mb: 1,
      }}
    >
      {message.role == "user" ? (
        <Typography
          component="span"
          variant="inherit"
          sx={{ backgroundColor: "grey.800", borderRadius: 2, py: 1, px: 1.5 }}
        >
          {message.content}
        </Typography>
      ) : (
        <>
          <Avatar sx={{ mr: 1.5 }} src="/luffy-avatar.png" alt="Luffy" />
          <div>
            {message.content}
            {isLoading && index == messages.length - 1 && (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Luffy is typing...
              </Typography>
            )}
          </div>
        </>
      )}
    </Typography>
  ));

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
