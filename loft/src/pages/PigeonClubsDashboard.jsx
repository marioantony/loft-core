import React, { useState } from "react";
import {
    Container, Card, CardContent, Typography, Button, Grid, Tabs, Tab, Box, List, ListItem, ListItemText
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const loggedInUser = { userType: "Pigeoner", name: "John Doe" };

const initialClubs = [
    {
        id: 1,
        name: "Sky Flyers Club",
        place: "Colombo",
        motto: "Fly Beyond Limits",
        members: ["Alice", "Bob"],
        events: [
            { title: "Sky Race", status: "Ongoing" },
            { title: "Cloud Sprint", status: "Completed" },
        ],
        pendingRequests: ["John Doe"],
    },
];

const PigeonClubsDashboard = () => {
    const [clubs, setClubs] = useState(initialClubs);
    const navigate = useNavigate();

    const handleFollowToggle = (clubId) => {
        setClubs((prev) =>
            prev.map((club) => {
                const isRequested = club.pendingRequests.includes(loggedInUser.name);
                return club.id === clubId
                    ? {
                        ...club,
                        pendingRequests: isRequested
                            ? club.pendingRequests.filter((u) => u !== loggedInUser.name)
                            : [...club.pendingRequests, loggedInUser.name],
                    }
                    : club;
            })
        );
    };

    const handleCardClick = (clubId) => {
        navigate(`/clubs/${clubId}`);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Pigeon Clubs</Typography>
            <Grid container spacing={3}>
                {clubs.map((club) => {
                    const isFollowing = club.pendingRequests.includes(loggedInUser.name);
                    return (
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                height: "100%",
                                padding: 2,
                                boxShadow: 3,
                                borderRadius: 2,
                                minWidth: "250px"
                            }}>
                                <CardContent onClick={() => handleCardClick(club.id)} sx={{ textAlign: "center" }}>
                                    <Typography variant="h6" gutterBottom>{club.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">📍 {club.place}</Typography>
                                    <Typography variant="body2" color="textSecondary">🏆 {club.motto}</Typography>
                                </CardContent>
                                <Box textAlign="center" pb={2}>
                                    <Button
                                        variant="contained"
                                        color={isFollowing ? "success" : "primary"}
                                        onClick={() => handleFollowToggle(club.id)}
                                    >
                                        {isFollowing ? "Following" : "Follow"}
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>

                    );
                })}
            </Grid>
        </Container>
    );
};

export default PigeonClubsDashboard;
