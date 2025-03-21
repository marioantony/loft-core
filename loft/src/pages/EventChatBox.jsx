import React, { useState } from "react";
import {
    Container, Typography, Button, Box, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import { useParams } from "react-router-dom";

const mockEventData = {
    id: 101,
    title: "Sky Race",
    status: "Ongoing",
    startTime: null,
    completed: false,
    location: { lat: "6.9271", lng: "79.8612" },
    scannedPigeons: []
};

const mockPigeonData = [
    { ringNumber: "R123", name: "Storm", owner: "Alice" },
    { ringNumber: "R456", name: "Flash", owner: "Bob" }
];

const EventChatBox = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(mockEventData);
    const [qrScanPopup, setQrScanPopup] = useState(false);
    const [resultPopup, setResultPopup] = useState(false);

    const handleStartEvent = () => {
        setEvent((prev) => ({ ...prev, startTime: new Date().toLocaleString() }));
    };

    const handleScanPigeon = (pigeon) => {
        setEvent((prev) => ({
            ...prev,
            scannedPigeons: [...prev.scannedPigeons, { ...pigeon, scannedTime: new Date().toLocaleString() }]
        }));
        setQrScanPopup(false);
    };

    const handleCompleteEvent = () => {
        setEvent((prev) => ({ ...prev, completed: true, status: "Completed" }));
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4">Event Chat - {event.title}</Typography>
            <Box mt={3}>
                {event.startTime ? (
                    <>
                        <Typography><strong>Event Started At:</strong> {event.startTime}</Typography>
                        <Typography><strong>Location:</strong> Lat {event.location.lat}, Lng {event.location.lng}</Typography>

                        {!event.completed && (
                            <>
                                <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }} onClick={() => setQrScanPopup(true)}>
                                    Scan Pigeon QR Code
                                </Button>
                                <Button variant="outlined" color="error" sx={{ mt: 2 }} onClick={handleCompleteEvent}>
                                    Complete Event
                                </Button>
                            </>
                        )}

                        {event.completed && (
                            <Button variant="contained" color="success" sx={{ mt: 2 }} onClick={() => setResultPopup(true)}>
                                View Results
                            </Button>
                        )}
                    </>
                ) : (
                    <Button variant="contained" color="success" onClick={handleStartEvent}>Start Event</Button>
                )}
            </Box>

            {/* Scanned Pigeons List */}
            {event.scannedPigeons.length > 0 && (
                <Box mt={4}>
                    <Typography variant="h6">Scanned Pigeons</Typography>
                    <List>
                        {event.scannedPigeons.map((pigeon, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={`Ring No: ${pigeon.ringNumber} - ${pigeon.name}`} secondary={`Owner: ${pigeon.owner}, Scanned At: ${pigeon.scannedTime}`} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}

            {/* Simulated QR Scan Popup */}
            <Dialog open={qrScanPopup} onClose={() => setQrScanPopup(false)} fullWidth maxWidth="sm">
                <DialogTitle>Simulate QR Scan</DialogTitle>
                <DialogContent>
                    <Typography>Select a pigeon to simulate QR scan:</Typography>
                    <List>
                        {mockPigeonData.map((pigeon, index) => (
                            <ListItem button key={index} onClick={() => handleScanPigeon(pigeon)}>
                                <ListItemText primary={`${pigeon.name} (Ring: ${pigeon.ringNumber})`} secondary={`Owner: ${pigeon.owner}`} />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setQrScanPopup(false)} color="secondary">Cancel</Button>
                </DialogActions>
            </Dialog>

            {/* Results Popup */}
            <Dialog open={resultPopup} onClose={() => setResultPopup(false)} fullWidth maxWidth="sm">
                <DialogTitle>Event Results</DialogTitle>
                <DialogContent>
                    {event.scannedPigeons.length > 0 ? (
                        <List>
                            {event.scannedPigeons.map((pigeon, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={`#${index + 1} - ${pigeon.name} (Ring: ${pigeon.ringNumber})`}
                                        secondary={`Owner: ${pigeon.owner}, Scanned At: ${pigeon.scannedTime}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography>No pigeons were scanned during this event.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setResultPopup(false)} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default EventChatBox;
