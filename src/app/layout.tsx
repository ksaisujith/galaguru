import type { Metadata } from "next";
import "./globals.css";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Container, Toolbar } from "@mui/material";
import theme from '../theme';
import Nav from "./nav/nav";

export const metadata: Metadata = {
  title: "Gala guru",
  description: "Platform to manage all events",
};

const drawerWidth = 240;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Nav drawerWidth = {drawerWidth} />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                bgcolor: "white",
                marginLeft: `${drawerWidth}px`, // Ensure content starts after drawer
              }}
            >
              <Toolbar/>
              <Container>
                {children}
              </Container>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
