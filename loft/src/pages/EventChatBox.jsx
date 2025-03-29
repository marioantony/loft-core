// EventChatBox.jsx
import React, { useEffect, useState } from "react";
import {
    Container, Typography, Button, Box, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import API from "../utils/api.js";

const EventChatBox = () => {
    const { eventId } = useParams();
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");

    const [event, setEvent] = useState(null);
    const [qrScanPopup, setQrScanPopup] = useState(false);
    const [resultPopup, setResultPopup] = useState(false);
    const [scanner, setScanner] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [results, setResults] = useState([]);

    // Load event details
    useEffect(() => {
        const fetchData = async () => {
            const events = await API.get("/events");
            const event = events.data.find(e => e.id.toString() === eventId);
            if (event) setEvent(event);

            const res = await API.get(`/participation/event/${eventId}`);
            setParticipants(res.data.map(p => p.pigeon));
        };
        fetchData();
    }, [eventId]);

    const handleStartEvent = async () => {
        const updated = { ...event, startedAt: new Date().toISOString() };
        await API.put(`/events/${eventId}/start`, updated); // assume endpoint exists
        setEvent(updated);
    };

    const handleCompleteEvent = async () => {
        const updated = { ...event, completed: true };
        await API.put(`/events/${eventId}/complete`, updated); // assume endpoint exists
        setEvent(updated);
    };

    const handleScanPigeon = async (qrToken) => {
        try {
            const res = await API.post("/scan", {
                qrToken,
                eventId,
                arrivalLat: 6.9271,
                arrivalLng: 79.8612
            });

            const scanned = res.data;
            const pigeon = scanned.pigeon;
            const scannedTime = scanned.arrivalTime;

            setParticipants(prev =>
                prev.map(p => p.id === pigeon.id ? { ...p, scannedTime } : p)
            );

            if (scanner) await scanner.stop();
            setScanner(null);
            setQrScanPopup(false);
        } catch (err) {
            alert(err.response?.data?.message || "Scan failed");
        }
    };

    const startScanner = () => {
        const html5QrCode = new Html5Qrcode("qr-reader");
        setScanner(html5QrCode);

        html5QrCode.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: 250 },
            (decodedText) => handleScanPigeon(decodedText),
            (errorMessage) => console.warn(errorMessage)
        );
    };

    const stopScanner = () => {
        if (scanner) scanner.stop().then(() => setScanner(null));
        setQrScanPopup(false);
    };

    const loadResults = async () => {
        const res = await API.get(`/scan/results/${eventId}`);
        setResults(res.data);
        setResultPopup(true);
    };

    const exportCSV = () => {
        window.open(`/api/scan/results/${eventId}/export`, '_blank');
    };

    if (!event) return <Typography>Loading...</Typography>;

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4">Event Chat - {event.title}</Typography>
            <Typography variant="subtitle1">Organized by: {event.createdBy?.name}</Typography>
            <Box mt={3}>
                {event.startedAt ? (
                    <>
                        <Typography><strong>Event Started At:</strong> {new Date(event.startedAt).toLocaleString()}</Typography>

                        {!event.completed && userRole === "CLUB" && event.createdBy?.id == userId && (
                            <Button variant="outlined" color="error" sx={{ mt: 2 }} onClick={handleCompleteEvent}>
                                Complete Event
                            </Button>
                        )}

                        {!event.completed && userRole === "PIGEONER" && (
                            <Button variant="contained" color="primary" sx={{ mt: 2, ml: 2 }}
                                    onClick={() => { setQrScanPopup(true); setTimeout(startScanner, 500); }}>
                                Scan Pigeon QR Code
                            </Button>
                        )}

                        {event.completed && (
                            <Button variant="contained" color="success" sx={{ mt: 2 }} onClick={loadResults}>
                                View Results
                            </Button>
                        )}
                    </>
                ) : (
                    event.createdBy?.id == userId && userRole === "CLUB" ? (
                        <Button variant="contained" color="success" onClick={handleStartEvent}>Start Event</Button>
                    ) : (
                        <Typography color="textSecondary" mt={2}>
                            Waiting for event to be started by the club...
                        </Typography>
                    )
                )}
            </Box>

            <Box mt={4}>
                <Typography variant="h6">Participant Pigeons</Typography>
                <List>
                    {participants.map((pigeon, index) => (
                        <ListItem key={index} divider>
                            <ListItemText
                                primary={`${pigeon.bloodLine} (Color: ${pigeon.color})`}
                                secondary={pigeon.scannedTime ? `Scanned At: ${new Date(pigeon.scannedTime).toLocaleString()}` : "Not Scanned"}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Dialog open={qrScanPopup} onClose={stopScanner} fullWidth maxWidth="sm">
                <DialogTitle>QR Scanner</DialogTitle>
                <DialogContent>
                    <div id="qr-reader" style={{ width: "100%" }}></div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={stopScanner} color="secondary">Close</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={resultPopup} onClose={() => setResultPopup(false)} fullWidth maxWidth="md">
                <DialogTitle>Race Results</DialogTitle>
                <DialogContent>
                    {results.length > 0 ? (
                        <List>
                            {results.map((r, i) => (
                                <ListItem key={i}>
                                    <ListItemText
                                        primary={`#${r.position} - ${r.bloodLine} (${r.color})`}
                                        secondary={`Owner: ${r.ownerName} | Speed: ${r.speedMetersPerMin.toFixed(2)} m/min`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography>No results yet.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={exportCSV} color="primary">Download CSV</Button>
                    <Button onClick={() => setResultPopup(false)} color="secondary">Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default EventChatBox;
