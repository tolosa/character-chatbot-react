import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

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
    <p>TODO: add content</p>
  </ThemeProvider>
);

export default App;
