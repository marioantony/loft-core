import React, { useState, useEffect } from "react";
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    TextField
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from '../utils/api.js';
import { QRCodeCanvas } from "qrcode.react";


const EventsDashboard = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [openCreatePopup, setOpenCreatePopup] = useState(false);
    const [openAssignPopup, setOpenAssignPopup] = useState(false);
    const [availablePigeons, setAvailablePigeons] = useState([]);
    const [assignedPigeonIds, setAssignedPigeonIds] = useState([]);
    const [currentEventId, setCurrentEventId] = useState(null);
    const [participantsData, setParticipantsData] = useState([]);
    const [showQrDialog, setShowQrDialog] = useState(false);
    const [qrPigeonToken, setQrPigeonToken] = useState(null);
    const navigate = useNavigate();

    const [newEvent, setNewEvent] = useState({
        title: "",
        description: "",
        eventDate: "",
    });

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
            setNewEvent({ title: "", description: "", eventDate: "" });
            setOpenCreatePopup(false);
            fetchEvents();
        } catch (error) {
            console.error("Error creating event:", error);
            alert("Failed to create event. Are you logged in as CLUB?");
        }
    };

    const handleParticipate = async (eventId) => {
        setCurrentEventId(eventId);
        setOpenAssignPopup(true);
        try {
            const userId = localStorage.getItem("userId");
            const pigeonRes = await API.get(`/pigeons/owner/${userId}`);
            const participationRes = await API.get(`/participation/event/${eventId}`);
            const assignedIds = participationRes.data.map(p => p.pigeon.id);

            setAvailablePigeons(pigeonRes.data);
            setAssignedPigeonIds(assignedIds);
        } catch (err) {
            console.error("Error loading pigeons:", err);
        }
    };

    const handleTogglePigeonAssignment = async (pigeonId) => {
        try {
            if (assignedPigeonIds.includes(pigeonId)) {
                await API.delete(`/participation/leave`, {
                    data: { eventId: currentEventId, pigeonId }
                });
                setAssignedPigeonIds(prev => prev.filter(id => id !== pigeonId));
            } else {
                await API.post("/participation/join", {
                    eventId: currentEventId,
                    pigeonId: pigeonId,
                });
                setAssignedPigeonIds(prev => [...prev, pigeonId]);
            }
        } catch (err) {
            console.error("Error assigning/unassigning pigeon:", err);
        }
    };

    const handleViewParticipants = async (event) => {
        setSelectedEvent(event);
        setOpenPopup(true);
        try {
            const res = await API.get(`/participation/event/${event.id}`);
            setParticipantsData(res.data);
        } catch (error) {
            console.error("Failed to fetch participants:", error);
        }
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
        setSelectedEvent(null);
    };

    const handlePrintQR = (token) => {
        setQrPigeonToken(token);
        setShowQrDialog(true);
    };

    const fetchEvents = async () => {
        try {
            const res = await API.get("/events");
            setEvents(res.data);
        } catch (error) {
            console.error("Failed to fetch events:", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <Container sx={{ mt: 12 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" fontWeight="bold">Events Dashboard</Typography>
                {role === "CLUB" && (
                    <Button variant="contained" color="primary" onClick={() => setOpenCreatePopup(true)}>Create Event</Button>
                )}
            </Box>

            <Grid container spacing={3}>
                {events.map((event) => (
                    <Grid item xs={12} md={6} key={event.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold">{event.title}</Typography>
                                <Typography variant="body2" color="textSecondary">{event.createdBy?.name || "Unknown Club"}</Typography>
                                <Typography variant="body1" mt={1}>{event.description}</Typography>
                                <Typography variant="body2" mt={1}><strong>Event Date:</strong> {new Date(event.eventDateTime).toLocaleString()}</Typography>
                                <Typography variant="body2"><strong>Created On:</strong> {new Date(event.createdAt).toLocaleString()}</Typography>
                                <Box mt={2} display="flex" gap={2}>
                                    <Button variant="contained" color="primary" onClick={() => handleParticipate(event.id)}>Participate</Button>
                                    <Button variant="outlined" color="secondary" onClick={() => handleViewParticipants(event)}>View Participants</Button>
                                    <Button variant="text" color="info" onClick={() => navigate(`/chat/${event.id}`)}>Visit Event</Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={openPopup} onClose={handleClosePopup} fullWidth maxWidth="sm">
                <DialogTitle>Participants List</DialogTitle>
                <DialogContent>
                    {participantsData.length > 0 ? (
                        <List>
                            {participantsData.map((participant, index) => (
                                <ListItem key={index} divider>
                                    <ListItemText
                                        primary={`Name: ${participant.pigeon.bloodLine}`}
                                        secondary={`Owner: ${participant.pigeon.owner.name}`}
                                    />
                                    <Button variant="outlined" onClick={() => handlePrintQR(participant.pigeon.qrToken)}>Print QR</Button>
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

            <Dialog open={showQrDialog} onClose={() => setShowQrDialog(false)} fullWidth maxWidth="xs">
                <DialogTitle>QR Code</DialogTitle>
                <DialogContent sx={{ textAlign: "center" }}>
                    {qrPigeonToken && <QRCodeCanvas value={qrPigeonToken} size={128} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowQrDialog(false)} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openCreatePopup} onClose={() => setOpenCreatePopup(false)} fullWidth maxWidth="sm">
                <DialogTitle>Create New Event</DialogTitle>
                <DialogContent>
                    <TextField fullWidth label="Event Title" margin="dense" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                    <TextField fullWidth label="Event Description" margin="dense" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
                    <TextField fullWidth label="Event Date & Time" type="datetime-local" margin="dense" value={newEvent.eventDate} onChange={(e) => setNewEvent({ ...newEvent, eventDate: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCreatePopup(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleCreateEvent} color="primary" variant="contained">Create</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openAssignPopup} onClose={() => setOpenAssignPopup(false)} fullWidth maxWidth="sm">
                <DialogTitle>Assign Your Pigeons</DialogTitle>
                <DialogContent>
                    {availablePigeons.length === 0 ? (
                        <Typography>No pigeons found</Typography>
                    ) : (
                        <List>
                            {availablePigeons.map((pigeon) => (
                                <ListItem key={pigeon.id} divider>
                                    <ListItemText primary={pigeon.bloodLine} secondary={`Color: ${pigeon.color}`} />
                                    <Button
                                        variant="contained"
                                        color={assignedPigeonIds.includes(pigeon.id) ? "error" : "primary"}
                                        onClick={() => handleTogglePigeonAssignment(pigeon.id)}
                                    >
                                        {assignedPigeonIds.includes(pigeon.id) ? "Unassign" : "Assign"}
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAssignPopup(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default EventsDashboard;
