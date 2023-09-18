import React from 'react';
import {
  Box,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Container,
} from '@mui/material';

// TODO: anyをやめる
export const Layout = (props: any) => {
  const { children } = props

  return (
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
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          height: '100vh',
          flexGlow: 1,
          bgcolor: '#f5f5f5',
          // overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};
