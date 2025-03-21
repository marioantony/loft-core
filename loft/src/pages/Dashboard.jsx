import React from "react";
import { Box, Toolbar, Container } from "@mui/material";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import DashboardCards from "../components/DashboardCards";

const Dashboard = () => {
    return (
        <Box sx={{ display: "inline-block", height: "100vh", bgcolor: "#e3f2fd" }}>
            {/*<Sidebar />*/}
            <Box sx={{ flexGrow: 1, height: "100vh" }}>
                {/*<Navbar />*/}
                {/*<Toolbar />*/}
                <Container sx={{ mt: -10 }}>
                    <DashboardCards />
                </Container>
            </Box>
        </Box>
    );
};

export default Dashboard;
