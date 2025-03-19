import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Typography, IconButton } from "@mui/material";
import { Menu as MenuIcon, Dashboard as DashboardIcon, Settings as SettingsIcon, ExitToApp as ExitToAppIcon } from "@mui/icons-material";
import store from "./store/store.js";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

const drawerWidth = 240;

const theme = createTheme({
    palette: {
        primary: { main: "#1976d2" },
        secondary: { main: "#dc004e" },
        background: { default: "#f4f6f8" },
    },
    typography: {
        fontFamily: "'Roboto', sans-serif",
    },
});

const Sidebar = () => {
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    background: "#fff",
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar>
                <Typography variant="h6" noWrap sx={{ padding: 2 }}>
                    My App
                </Typography>
            </Toolbar>
            <List>
                {[{ text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
                    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
                    { text: "Logout", icon: <ExitToAppIcon />, path: "/" }].map((item, index) => (
                    <ListItem button key={index} component="a" href={item.path}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <Box sx={{ display: "flex" }}>
                        <Sidebar />
                        <Box
                            component="main"
                            sx={{ flexGrow: 1, p: 3, background: "#e3f2fd", height: "100vh" }}
                        >
                            <Routes>
                                <Route path="/" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                            </Routes>
                        </Box>
                    </Box>
                </Router>
            </ThemeProvider>
        </Provider>
    );
}

export default App;