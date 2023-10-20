import { StrictMode } from 'react';
import {
  Box,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Container,
} from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";

// TODO: anyをやめる
export const Layout = (props: any): JSX.Element => {
  const { children } = props;

  const theme = createTheme({
    palette: {
      primary: {
        main: "#0b5394",
      },
    },
  });

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <Box>
          <AppBar position="absolute">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="open drawer">
                {/* TODO: 後でアイコンにする */}三
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                KAKEI
              </Typography>
              <IconButton color="inherit" href="/budgets" size="small">予算一覧</IconButton>
            </Toolbar>
          </AppBar>
          <Box
            component="main"
            sx={{
              height: "100vh",
              flexGlow: 1,
              bgcolor: "#f5f5f5",
              // overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
              {children}
            </Container>
          </Box>
        </Box>
        </ThemeProvider>
      </StrictMode>
  );
};
