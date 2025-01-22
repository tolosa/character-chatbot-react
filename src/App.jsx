import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { ChatBot } from "./components/ChatBot";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#242424",
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme} noSsr>
    <CssBaseline />
    <ChatBot />
  </ThemeProvider>
);

export default App;
