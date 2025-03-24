import React from "react";
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import EventsDashboard from "../pages/EventsDashboard.jsx";
import PigeonsDashboard from "../pages/PigeonsDashboard.jsx";
import PigeonClubsDashboard from "../pages/PigeonClubsDashboard.jsx";
import ClubDetailsView from "../pages/ClubDetailsView.jsx";
import EventChatBox from "../pages/EventChatBox.jsx";
const drawerWidth = 240;
import {
    Dashboard as DashboardIcon,
    ExitToApp as ExitToAppIcon,
    Menu as MenuIcon,
    Settings as SettingsIcon
} from "@mui/icons-material";

const Sidebar = ({ open, handleDrawerToggle }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        navigate('/');
    };
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
                    { text: "Logout", icon: <ExitToAppIcon onClick={handleLogout} />, path: "/" }].map((item, index) => (
                    <ListItem button key={index} component="a" href={item.path} sx={{ justifyContent: open ? "flex-start" : "center" }}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        {open && <ListItemText primary={item.text} />}
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};
function AppContent({ open, handleDrawerToggle }) {
    const location = useLocation();
    const noLayoutRoutes = ['/', '/signup'];
    const showLayout = !noLayoutRoutes.includes(location.pathname);

    return (
        <Box sx={{ display: "flex" }}>
            {showLayout && (
                <>
                    <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} />
                    <AppBar
                        position="fixed"
                        sx={{
                            width: `calc(100% - ${open ? drawerWidth : 65}px)`,
                            ml: `${open ? drawerWidth : 65}px`,
                            transition: "width 0.3s ease-in-out",
                        }}
                    >
                        {/*<Toolbar>*/}
                        {/*    <Typography variant="h6" sx={{ flexGrow: 1 }}>*/}
                        {/*        Dashboard*/}
                        {/*    </Typography>*/}
                        {/*</Toolbar>*/}
                    </AppBar>
                    <Toolbar />
                </>
            )}

            <Box
                component={"main"}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    minHeight: "100vh",
                    width: "100%", // ensure full width when sidebar hidden
                }}
            >
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={
                        <ProtectedRoute><Dashboard /></ProtectedRoute>
                    } />
                    <Route path="/eventsdashboard" element={
                        <ProtectedRoute><EventsDashboard /></ProtectedRoute>
                    } />
                    <Route path="/pigeonsDashboard" element={
                        <ProtectedRoute><PigeonsDashboard /></ProtectedRoute>
                    } />
                    <Route path="/clubs" element={
                        <ProtectedRoute><PigeonClubsDashboard /></ProtectedRoute>
                    } />
                    <Route path="/clubs/:id" element={
                        <ProtectedRoute><ClubDetailsView /></ProtectedRoute>
                    } />
                    <Route path="/chat/:eventId" element={
                        <ProtectedRoute><EventChatBox /></ProtectedRoute>
                    } />
                </Routes>
            </Box>
        </Box>
    );
}

export default AppContent;