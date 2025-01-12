"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./globals.css";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // const toggleTheme = () => {
  //   setIsDarkMode((prev) => !prev);
  // };

  // const theme = createTheme({
  //   palette: {
  //     mode: isDarkMode ? "dark" : "light",
  //     background: {
  //       default: isDarkMode ? "#121212" : "#f5f5f5",
  //       paper: isDarkMode ? "#1e1e1e" : "#ffffff"
  //     },
  //     primary: {
  //       light: "#ff0000",
  //       dark: "#00ff00",
  //       main: "#0000ff"
  //     }
  //   },
  //   components: {
  //     MuiPaper: {
  //       styleOverrides: {
  //         root: {
  //           borderRadius: "8px",
  //           boxShadow: isDarkMode
  //             ? "0 4px 6px rgba(0,0,0,0.7)"
  //             : "0 4px 6px rgba(0,0,0,0.1)"
  //         }
  //       }
  //     }
  //   }
  // });

  const theme = createTheme({
    colorSchemes: {
      light: true,
      dark: true
    },
    palette: {
      mode: "dark"
    }
  });

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* <Button
            onClick={toggleTheme}
            variant="contained"
            style={{
              position: "fixed",
              top: 20,
              right: 20,
              padding: "10px 20px"
            }}
          >
            Toggle Theme
          </Button> */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
