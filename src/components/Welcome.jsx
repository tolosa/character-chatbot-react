import { Typography, Box } from "@mui/material";

const Welcome = () => (
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
      style={{ height: 320, marginBottom: "1rem" }}
    />
    <Typography variant="h4" align="center">
      I&lsquo;m Monkey D. Luffy!
    </Typography>
    <Typography variant="h5" sx={{ color: "grey.500", mb: 2 }}>
      Captain of the Straw Hat Pirates
    </Typography>
    <Typography variant="subtitle1" sx={{ color: "grey.300" }}>
      Ask me anything!
    </Typography>
  </Box>
);

export { Welcome };
