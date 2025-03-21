import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const DashboardCards = () => {
    const stats = [
        { title: "Total Users", value: "1,245" },
        { title: "Active Pigeoners", value: "850" },
        { title: "Events Created", value: "125" },
        { title: "Pigeons Registered", value: "3,567" },
    ];

    return (
        <Grid container spacing={3}>
            {stats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ background: "#f5f5f5", borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="h6" color="primary">{stat.title}</Typography>
                            <Typography variant="h4" fontWeight="bold">{stat.value}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default DashboardCards;
