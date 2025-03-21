import React, { useState } from "react";
import { Box, Container, Typography, Button, Card, CardContent, Grid, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, TextField } from "@mui/material";

const loggedInUser = { userType: "Pigeoner", name: "John Doe" };

const pigeonsData = [
    {
        id: 1,
        bloodLine: "Champion Line",
        color: "White",
        age: "2 years",
        owner: "John Doe",
        history: {
            birthDate: "2023-01-15",
            previousOwners: [
                { name: "Mike Ross", ownedFrom: "2023-01-15", ownedTo: "2023-06-10" },
                { name: "John Doe", ownedFrom: "2023-06-10", ownedTo: "Present" },
            ],
            raceDetails: [
                { race: "Sky Challenge 2024", position: "1st Place" },
                { race: "Mountain Glide 2024", position: "3rd Place" },
            ],
        },
    },
    {
        id: 2,
        bloodLine: "Elite Flyers",
        color: "Blue",
        age: "3 years",
        owner: "Mike Ross",
        history: {
            birthDate: "2022-05-20",
            previousOwners: [
                { name: "Emily Watson", ownedFrom: "2022-05-20", ownedTo: "2023-02-11" },
                { name: "Mike Ross", ownedFrom: "2023-02-11", ownedTo: "Present" },
            ],
            raceDetails: [
                { race: "Grand Pigeon Derby 2023", position: "2nd Place" },
            ],
        },
    },
];

const PigeonsDashboard = () => {
    const [pigeons, setPigeons] = useState(pigeonsData);
    const [selectedPigeon, setSelectedPigeon] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [openCreatePopup, setOpenCreatePopup] = useState(false);
    const [newPigeon, setNewPigeon] = useState({ bloodLine: "", color: "", age: "", owner: loggedInUser.name });

    const handleViewPigeon = (pigeon) => {
        setSelectedPigeon(pigeon);
        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
        setSelectedPigeon(null);
    };

    const handleCreatePigeon = () => {
        const newId = pigeons.length + 1;
        setPigeons([...pigeons, { id: newId, ...newPigeon, history: { birthDate: "N/A", previousOwners: [], raceDetails: [] } }]);
        setOpenCreatePopup(false);
        setNewPigeon({ bloodLine: "", color: "", age: "", owner: loggedInUser.name });
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4">Pigeons Dashboard</Typography>
                {loggedInUser.userType === "Pigeoner" && (
                    <Button variant="contained" color="primary" onClick={() => setOpenCreatePopup(true)}>
                        Create Pigeon
                    </Button>
                )}
            </Box>

            <Typography variant="h6" mt={3}>My Pigeons</Typography>
            <Grid container spacing={3}>
                {pigeons.filter(p => p.owner === loggedInUser.name).map((pigeon) => (
                    <Grid item xs={12} md={6} key={pigeon.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{pigeon.bloodLine}</Typography>
                                <Typography variant="body2">Color: {pigeon.color}</Typography>
                                <Typography variant="body2">Age: {pigeon.age}</Typography>
                                <Typography variant="body2">Owner: {pigeon.owner}</Typography>
                                <Button variant="outlined" color="secondary" onClick={() => handleViewPigeon(pigeon)} sx={{ mt: 2 }}>
                                    View
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h6" mt={5}>Other Pigeons</Typography>
            <Grid container spacing={3}>
                {pigeons.filter(p => p.owner !== loggedInUser.name).map((pigeon) => (
                    <Grid item xs={12} md={6} key={pigeon.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{pigeon.bloodLine}</Typography>
                                <Typography variant="body2">Color: {pigeon.color}</Typography>
                                <Typography variant="body2">Age: {pigeon.age}</Typography>
                                <Typography variant="body2">Owner: {pigeon.owner}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* View Pigeon Popup */}
            <Dialog open={openPopup} onClose={handleClosePopup} fullWidth maxWidth="sm">
                <DialogTitle>Pigeon History</DialogTitle>
                <DialogContent>
                    {selectedPigeon && (
                        <>
                            <Typography><strong>Birth Date:</strong> {selectedPigeon.history.birthDate}</Typography>
                            <Typography variant="h6" mt={2}>Previous Owners</Typography>
                            <List>
                                {selectedPigeon.history.previousOwners.map((owner, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={owner.name} secondary={`Owned from ${owner.ownedFrom} to ${owner.ownedTo}`} />
                                    </ListItem>
                                ))}
                            </List>
                            <Typography variant="h6" mt={2}>Race Details</Typography>
                            <List>
                                {selectedPigeon.history.raceDetails.map((race, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={race.race} secondary={`Position: ${race.position}`} />
                                    </ListItem>
                                ))}
                            </List>
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

export default PigeonsDashboard;
