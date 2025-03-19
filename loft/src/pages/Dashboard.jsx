import React from "react";
import { Box, Typography } from "@mui/material";
import Sidebar from "../layouts/Sidebar.jsx";

const Dashboard = () => {
    return (
        <Box sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h4">Dashboard</Typography>
            </Box>
        </Box>
    );
};

export default Dashboard;
