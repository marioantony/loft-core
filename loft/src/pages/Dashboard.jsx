import React from "react";
import { Box, Toolbar, Container, Typography, Grid, Paper } from "@mui/material";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import DashboardCards from "../components/DashboardCards";
import {
    PieChart, Pie, Cell,
    AreaChart, Area,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const clubParticipationData = [
    { name: "Sky Flyers", value: 10 },
    { name: "Eagle Racers", value: 7 },
    { name: "Jaffna Wings", value: 14 },
    { name: "Northern Club", value: 5 }
];

const speedTrendData = [
    { name: "Race 1", speed: 850 },
    { name: "Race 2", speed: 920 },
    { name: "Race 3", speed: 870 },
    { name: "Race 4", speed: 960 },
    { name: "Race 5", speed: 890 }
];

const pigeonPerformanceData = [
    { subject: "Speed", A: 120, fullMark: 150 },
    { subject: "Consistency", A: 98, fullMark: 150 },
    { subject: "Arrival Accuracy", A: 86, fullMark: 150 },
    { subject: "Fitness", A: 99, fullMark: 150 },
    { subject: "Endurance", A: 85, fullMark: 150 }
];

const pigeonStatusData = [
    { name: "Active", count: 70 },
    { name: "Suspended", count: 10 }
];

const Dashboard = () => {
    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <Box sx={{ flexGrow: 1, height: "100vh" }}>
                <Toolbar />
                <Container sx={{ mt: -10 }}>
                    <Toolbar />
                    <DashboardCards />

                    <Grid container spacing={4} sx={{ mt: 2 }}>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>Club-wise Participation</Typography>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie data={clubParticipationData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                            {clubParticipationData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>Average Speed Over Races</Typography>
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={speedTrendData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="speed" stroke="#8884d8" fill="#8884d8" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>Pigeon Performance Radar</Typography>
                                <ResponsiveContainer width="100%" height={300}>
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={pigeonPerformanceData}>
                                        <PolarGrid />
                                        <PolarAngleAxis dataKey="subject" />
                                        <PolarRadiusAxis angle={30} domain={[0, 150]} />
                                        <Radar name="Performance" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                        <Legend />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>Pigeon Status Overview</Typography>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={pigeonStatusData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis type="category" dataKey="name" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="count" fill="#82ca9d" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default Dashboard;
