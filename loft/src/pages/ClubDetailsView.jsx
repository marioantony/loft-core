import React, { useState } from "react";
import {
    Container, Typography, Tabs, Tab, Box, List, ListItem, ListItemText, Button, Grid, Divider, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const mockClubDetails = {
    id: 1,
    name: "Sky Flyers Club",
    members: ["Alice", "Bob"],
    events: [
        { id: 101, title: "Sky Race", status: "Ongoing" },
        { id: 102, title: "Cloud Sprint", status: "Completed", date: "2024-03-10", location: "Colombo", distance: "50 KM", firstPlace: { ringNumber: "R123", name: "Storm", owner: "Alice" }, lastPlace: { ringNumber: "R999", name: "Windy", owner: "Bob" } },
    ],
    pendingRequests: ["John Doe", "Emily"]
};

const ClubDetailsView = () => {
    const { id } = useParams();
    const [club, setClub] = useState(mockClubDetails);
    const [tab, setTab] = useState(0);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventPopupOpen, setEventPopupOpen] = useState(false);
    const navigate = useNavigate();

    const handleAccept = (userName) => {
        setClub((prev) => ({
            ...prev,
            members: [...prev.members, userName],
            pendingRequests: prev.pendingRequests.filter((name) => name !== userName),
        }));
    };

    const handleViewEvent = (event) => {
        if (event.status === "Ongoing") {
            navigate(`/chat/${event.id}`);
        } else {
            setSelectedEvent(event);
            setEventPopupOpen(true);
        }
    };

    const handleClosePopup = () => {
        setEventPopupOpen(false);
        setSelectedEvent(null);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>{club.name} - Club Details</Typography>
            <Tabs value={tab} onChange={(e, newTab) => setTab(newTab)}>
                <Tab label="Members" />
                <Tab label="Events" />
                <Tab label="Follow Requests" />
            </Tabs>

            <Box mt={3}>
                {tab === 0 && (
                    <List>
                        {club.members.map((member, i) => (
                            <ListItem key={i}>
                                <ListItemText primary={member} />
                            </ListItem>
                        ))}
                    </List>
                )}

                {tab === 1 && (
                    <>
                        <Typography variant="h6">Ongoing Events</Typography>
                        <List>
                            {club.events.filter(e => e.status === "Ongoing").map((event, i) => (
                                <ListItem key={i} secondaryAction={
                                    <Button variant="contained" color="primary" onClick={() => handleViewEvent(event)}>
                                        View
                                    </Button>
                                }>
                                    <ListItemText primary={event.title} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6">Completed Events</Typography>
                        <List>
                            {club.events.filter(e => e.status === "Completed").map((event, i) => (
                                <ListItem key={i} secondaryAction={
                                    <Button variant="outlined" color="secondary" onClick={() => handleViewEvent(event)}>
                                        View
                                    </Button>
                                }>
                                    <ListItemText primary={event.title} />
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}

                {tab === 2 && (
                    <List>
                        {club.pendingRequests.length > 0 ? club.pendingRequests.map((user, i) => (
                            <ListItem key={i} secondaryAction={
                                <Button variant="contained" color="primary" onClick={() => handleAccept(user)}>
                                    Accept
                                </Button>
                            }>
                                <ListItemText primary={user} />
                            </ListItem>
                        )) : (
                            <Typography>No pending requests.</Typography>
                        )}
                    </List>
                )}
            </Box>

            {/* Completed Event Details Popup */}
            <Dialog open={eventPopupOpen} onClose={handleClosePopup} fullWidth maxWidth="sm">
                <DialogTitle>Event Details</DialogTitle>
                <DialogContent>
                    {selectedEvent && (
                        <>
                            <Typography><strong>Date:</strong> {selectedEvent.date}</Typography>
                            <Typography><strong>Location:</strong> {selectedEvent.location}</Typography>
                            <Typography><strong>Distance:</strong> {selectedEvent.distance}</Typography>
                            <Typography variant="h6" mt={2}>🏆 First Place</Typography>
                            <Typography>Ring No: {selectedEvent.firstPlace.ringNumber}</Typography>
                            <Typography>Pigeon Name: {selectedEvent.firstPlace.name}</Typography>
                            <Typography>Owner: {selectedEvent.firstPlace.owner}</Typography>
                            <Typography variant="h6" mt={2}>🏅 Last Place</Typography>
                            <Typography>Ring No: {selectedEvent.lastPlace.ringNumber}</Typography>
                            <Typography>Pigeon Name: {selectedEvent.lastPlace.name}</Typography>
                            <Typography>Owner: {selectedEvent.lastPlace.owner}</Typography>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePopup} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ClubDetailsView;
