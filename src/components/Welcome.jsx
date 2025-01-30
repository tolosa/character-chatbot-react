import { Typography, Box, Chip, Icon } from "@mui/material";
import PropTypes from "prop-types";

const suggestedPrompts = [
  "What is your dream?",
  "Who is the first villain you defeated?",
  "Tell me about your family",
  "Who is your favorite crew member?",
  "What is the One Piece?",
];

const Welcome = ({ onPromptClick }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    }}
  >
    <img
      src="/luffy-welcome.webp"
      alt="Luffy"
      style={{ height: 320, marginBottom: "2rem" }}
    />
    <Typography variant="h4">I&lsquo;m Monkey D. Luffy!</Typography>
    <Typography variant="h5" sx={{ color: "grey.500", mb: 3 }}>
      Captain of the Straw Hat Pirates
    </Typography>
    <Typography variant="subtitle1" sx={{ color: "grey.300", mb: 2 }}>
      Ask me anything!
    </Typography>
    <Box
      sx={{
        maxWidth: "md",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "12px 10px",
      }}
    >
      {suggestedPrompts.map((prompt, index) => (
        <Chip
          label={prompt}
          key={index}
          variant="outlined"
          onClick={() => onPromptClick(prompt)}
          icon={<Icon fontSize="small">contact_support</Icon>}
          sx={{ "& .MuiChip-label": { px: 1 } }}
        />
      ))}
    </Box>
  </Box>
);

Welcome.propTypes = {
  onPromptClick: PropTypes.func.isRequired,
};

export { Welcome };
