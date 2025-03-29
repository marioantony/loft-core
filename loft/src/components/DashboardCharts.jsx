import React from "react";
import { PieChart, Pie, Cell, Tooltip as RechartTooltip, AreaChart, Area, XAxis, YAxis, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, ResponsiveContainer } from "recharts";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Sample Data
const clubParticipation = [
    { name: "Sky Wings", value: 8 },
    { name: "Jaffna Flyers", value: 6 },
    { name: "High Soarers", value: 10 },
    { name: "North Racers", value: 5 },
];

const avgSpeedOverTime = [
    { event: "Race 1", speed: 480 },
    { event: "Race 2", speed: 510 },
    { event: "Race 3", speed: 470 },
    { event: "Race 4", speed: 530 },
];

const pigeonMetrics = [
    { metric: "Speed", value: 90 },
    { metric: "Endurance", value: 80 },
    { metric: "Recovery", value: 70 },
    { metric: "Consistency", value: 85 },
];

const pigeonStatus = [
    { name: "Active", count: 35 },
    { name: "Suspended", count: 5 },
];

const DashboardCharts = () => {
    return (
        <Box sx={{ p: 4 }}>
            <Grid container spacing={4}>
                {/* Pie Chart */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Participation by Club
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie data={clubParticipation} dataKey="value" nameKey="name" outerRadius={100}>
                                        {clubParticipation.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <RechartTooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Area Chart */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Average Speed Over Time
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={avgSpeedOverTime}>
                                    <XAxis dataKey="event" />
                                    <YAxis />
                                    <Area type="monotone" dataKey="speed" stroke="#8884d8" fill="#8884d8" />
                                    <RechartTooltip />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Radar Chart */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Pigeon Performance Metrics
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <RadarChart outerRadius={100} data={pigeonMetrics}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="metric" />
                                    <PolarRadiusAxis />
                                    <Radar name="Pigeon" dataKey="value" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                                    <RechartTooltip />
                                </RadarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Horizontal Bar Chart */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Pigeon Status
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart layout="vertical" data={pigeonStatus}>
                                    <XAxis type="number" />
                                    <YAxis type="category" dataKey="name" />
                                    <Bar dataKey="count" fill="#8884d8" />
                                    <RechartTooltip />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashboardCharts;
