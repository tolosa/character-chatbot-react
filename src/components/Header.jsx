import {
  AppBar,
  Container,
  Typography,
  Tooltip,
  IconButton,
  Icon,
} from "@mui/material";
import PropTypes from "prop-types";

const Header = ({ onNewConversationClick }) => (
  <>
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
        <img
          src="/luffy-avatar.png"
          style={{
            borderRadius: 9999,
            height: "2.5rem",
            marginRight: "0.4rem",
            filter: "grayscale(100%) contrast(80%)",
          }}
        />
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Anime Chatbot
        </Typography>
        {onNewConversationClick && (
          <Tooltip title="New conversation">
            <IconButton size="small" onClick={onNewConversationClick}>
              <Icon fontSize="small">maps_ugc</Icon>
            </IconButton>
          </Tooltip>
        )}
      </Container>
    </AppBar>
  </>
);

Header.propTypes = {
  onNewConversationClick: PropTypes.func,
};

export { Header };
