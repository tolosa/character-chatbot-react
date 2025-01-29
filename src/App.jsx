import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { ChatBot } from "./components/ChatBot";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#232323",
    },
  },
  typography: {
    fontSize: 15.6,
  },
});

const App = () => (
  <ThemeProvider theme={theme} noSsr>
    <CssBaseline />
    <ChatBot />
  </ThemeProvider>
);

export default App;
