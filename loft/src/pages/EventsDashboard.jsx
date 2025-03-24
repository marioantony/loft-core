import React, { useState,useEffect } from "react";
import { Box, Container, Typography, Button, Card, CardContent, Grid, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, TextField } from "@mui/material";
import API from '../utils/api.js';
// const loggedInUser = { clubName: "Pigeon Club A" }; // Simulating logged-in user's club details

// const eventsData = [
//     {
//         id: 1,
//         clubName: "Pigeon Club A",
//         title: "Annual Racing Event",
//         description: "A thrilling pigeon race event.",
//         eventDate: "2025-04-10 10:00 AM",
//         createdDate: "2025-03-15 08:30 AM",
//         participants: [],
//     },
//     {
//         id: 2,
//         clubName: "Sky Flyers Club",
//         title: "Sky High Challenge",
//         description: "Compete in a high-altitude race.",
//         eventDate: "2025-05-05 02:00 PM",
//         createdDate: "2025-03-20 09:45 AM",
//         participants: [],
//     },
// ];

const EventsDashboard = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [openCreatePopup, setOpenCreatePopup] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: "",
        description: "",
        eventDate: "",
    });

    const handleParticipate = (eventId) => {
        const user = { name: "John Doe", email: "johndoe@example.com" }; // Replace with actual logged-in user
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === eventId ? { ...event, participants: [...event.participants, user] } : event
            )
        );
        alert("Participation Confirmed!");
    };

    const handleViewParticipants = (event) => {
        setSelectedEvent(event);
        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
        setSelectedEvent(null);
    };


    const role = localStorage.getItem("userRole");

    const handleCreateEvent = async () => {
        try {
            const createdBy = localStorage.getItem('userId');
            await API.post("/events/create", {
                title: newEvent.title,
                description: newEvent.description,
                eventDateTime: newEvent.eventDate,
                createdById: createdBy,
            });

            alert("Event created successfully!");

            // Clear form & close dialog
            setNewEvent({ title: "", description: "", eventDate: "" });
            setOpenCreatePopup(false);

            // Optionally re-fetch event list here
        } catch (error) {
            console.error("Error creating event:", error);
            alert("Failed to create event. Are you logged in as CLUB?");
        }
    };
// Fetch events when component mounts
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await API.get("/events");
                setEvents(res.data); // expects an array of events
            } catch (error) {
                console.error("Failed to fetch events:", error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <Container sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4">Events Dashboard</Typography>
                {role === "CLUB" && (
                <Button variant="contained" color="primary" onClick={() => setOpenCreatePopup(true)}>
                    Create Event
                </Button>
                )}
            </Box>
            <Grid container spacing={3}>
                {events.map((event) => (
                    <Grid item xs={12} md={6} key={event.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{event.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {event.createdBy?.name || "Unknown Club"}
                                </Typography>
                                <Typography variant="body1" mt={1}>{event.description}</Typography>
                                <Typography variant="body2" mt={1}><strong>Event Date:</strong> {new Date(event.eventDateTime).toLocaleString()}</Typography>
                                <Typography variant="body2"><strong>Created On:</strong> {new Date(event.createdAt).toLocaleString()}</Typography>
                                <Box mt={2}>
                                    <Button variant="contained" color="primary" onClick={() => handleParticipate(event.id)}>
                                        Participate
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={() => handleViewParticipants(event)} sx={{ ml: 2 }}>
                                        View Participants
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Participant List Popup */}
            <Dialog open={openPopup} onClose={handleClosePopup} fullWidth maxWidth="sm">
                <DialogTitle>Participants List</DialogTitle>
                <DialogContent>
                    {selectedEvent?.participants.length > 0 ? (
                        <List>
                            {selectedEvent.participants.map((participant, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={participant.name} secondary={participant.email} />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography>No participants yet.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePopup} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            {/* Create Event Popup */}
            <Dialog open={openCreatePopup} onClose={() => setOpenCreatePopup(false)} fullWidth maxWidth="sm">
                <DialogTitle>Create New Event</DialogTitle>
                <DialogContent>
                    {/*<TextField fullWidth label="Club Name" margin="dense" value={loggedInUser.clubName} disabled />*/}
                    <TextField fullWidth label="Event Title" margin="dense" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                    <TextField fullWidth label="Event Description" margin="dense" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
                    <TextField fullWidth label="Event Date & Time" type="datetime-local" margin="dense" value={newEvent.eventDate} onChange={(e) => setNewEvent({ ...newEvent, eventDate: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCreatePopup(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleCreateEvent} color="primary" variant="contained">Create</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default EventsDashboard;
