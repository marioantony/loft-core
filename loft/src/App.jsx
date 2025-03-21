import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Typography, IconButton } from "@mui/material";
import { Menu as MenuIcon, Dashboard as DashboardIcon, Settings as SettingsIcon, ExitToApp as ExitToAppIcon } from "@mui/icons-material";
import store from "./store/store.js";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import EventsDashboard from "./pages/EventsDashboard";
import PigeonsDashboard from "./pages/PigeonsDashboard";
import PigeonClubsDashboard from "./pages/PigeonClubsDashboard";
import ClubDetailsView from "./pages/ClubDetailsView";
import EventChatBox from "./pages/EventChatBox";
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

const Sidebar = ({ open, handleDrawerToggle }) => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: open ? drawerWidth : 65,
                flexShrink: 0,
                transition: "width 0.3s ease-in-out",
                "& .MuiDrawer-paper": {
                    width: open ? drawerWidth : 65,
                    overflowX: "hidden",
                    boxSizing: "border-box",
                    background: "#fff",
                },
            }}
        >
            <Toolbar>
                <IconButton onClick={handleDrawerToggle} sx={{ marginLeft: open ? -2 : -3 }}>
                    <MenuIcon />
                </IconButton>
            </Toolbar>
            <List>
                {[{ text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
                    { text: "Event", icon: <DashboardIcon />, path: "/eventsdashboard" },
                    { text: "Pigeons List", icon: <DashboardIcon />, path: "/pigeonsDashboard" },
                    { text: "Pigeon Clubs", icon: <DashboardIcon />, path: "/clubs" },
                    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
                    { text: "Logout", icon: <ExitToAppIcon />, path: "/" }].map((item, index) => (
                    <ListItem button key={index} component="a" href={item.path} sx={{ justifyContent: open ? "flex-start" : "center" }}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        {open && <ListItemText primary={item.text} />}
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

function App() {
    const [open, setOpen] = useState(true);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <Box sx={{ display: "flex" }}>
                        <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} />
                        <Box component={"main"} sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", minHeight: "100vh" }}>
                        <AppBar position="fixed" sx={{ width: `calc(100% - ${open ? drawerWidth : 65}px)`, ml: `${open ? drawerWidth : 65}px`, transition: "width 0.3s ease-in-out" }}>
                                <Toolbar>
                                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                        Dashboard
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <Toolbar />
                            <Routes>
                                <Route path="/" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/eventsdashboard" element={<EventsDashboard />} />
                                <Route path="/pigeonsDashboard" element={<PigeonsDashboard />} />
                                <Route path="/clubs" element={<PigeonClubsDashboard />} />
                                <Route path="/clubs/:id" element={<ClubDetailsView />} />
                                <Route path="/chat/:eventId" element={<EventChatBox />} />
                            </Routes>
                        </Box>
                    </Box>
                </Router>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
