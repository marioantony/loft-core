import React, { useState,useEffect } from "react";
import { Box, Container, Typography, Button, Card, CardContent, Grid, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, TextField, Tabs, Tab } from "@mui/material";
import API from "../utils/api.js"
const loggedInUser = { userType: "Pigeoner", name: "John Doe" };

const initialPigeons = [
    {
        id: 1,
        bloodLine: "Champion Line",
        color: "White",
        age: "2 years",
        owner: "John Doe",
        suspended: false,
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
    }
];

const PigeonsDashboard = () => {
    const [pigeons, setPigeons] = useState([]);
    const [allPigeons, setAllPigeons] = useState([])
    const [selectedPigeon, setSelectedPigeon] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [openCreatePopup, setOpenCreatePopup] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const [newPigeon, setNewPigeon] = useState({ bloodLine: "", color: "", age: "", owner: loggedInUser.name });

    const handleViewPigeon = (pigeon) => {
        setSelectedPigeon(pigeon);
        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
        setSelectedPigeon(null);
    };

    // const handleCreatePigeon = () => {
    //     if (!newPigeon.bloodLine || !newPigeon.color || !newPigeon.age) {
    //         alert("Please fill in all fields");
    //         return;
    //     }
    //     const newId = pigeons.length + 1;
    //     const createdPigeon = {
    //         id: newId,
    //         ...newPigeon,
    //         suspended: false,
    //         history: { birthDate: "N/A", previousOwners: [], raceDetails: [] },
    //     };
    //     setPigeons((prevPigeons) => [...prevPigeons, createdPigeon]);
    //     setOpenCreatePopup(false);
    //     setNewPigeon({ bloodLine: "", color: "", age: "", owner: loggedInUser.name });
    // };

    const handleCreatePigeon = async () => {
        const ownerId = localStorage.getItem("userId");
        if (!newPigeon.bloodLine || !newPigeon.color || !newPigeon.age) {
            alert("Please fill in all fields");
            return;
        }

        try {
            await API.post("/pigeons/create", {
                bloodLine: newPigeon.bloodLine,
                color: newPigeon.color,
                age: newPigeon.age,
                ownerId: ownerId,
            });

            alert("Pigeon created successfully!");
            setNewPigeon({ bloodLine: "", color: "", age: "" });
            setOpenCreatePopup(false);

            // Refresh list
            const response = await API.get(`/pigeons/owner/${ownerId}`);
            setPigeons(response.data);
        } catch (error) {
            console.error("Error creating pigeon:", error);
            alert("Failed to create pigeon.");
        }
    };
    
    const handleSuspendPigeon = async (id) => {
        try {
            await API.put(`/pigeons/${id}/toggle-suspend`);
            const ownerId = localStorage.getItem("userId");
            const res = await API.get(`/pigeons/owner/${ownerId}`);
            setPigeons(res.data);
        } catch (error) {
            console.error("Error toggling suspend:", error);
        }
    };



    useEffect(() => {
        const fetchPigeons = async () => {
            try {
                const ownerId = localStorage.getItem("userId");
                const response = await API.get(`/pigeons/owner/${ownerId}`);
                setPigeons(response.data);
            } catch (error) {
                console.error("Error fetching pigeons:", error);
            }
        };

        fetchPigeons();
    }, []);

    useEffect(() => {
        const fetchAllPigeons = async () => {
            try {
                const res = await API.get("/pigeons");
                setAllPigeons(res.data);
            } catch (err) {
                console.error("Error fetching all pigeons:", err);
            }
        };
        fetchAllPigeons();
    }, []);
    const createdBy = localStorage.getItem('userId');
    const ownerId = Number(localStorage.getItem("userId"));
    console.log(allPigeons.filter((a) => a.owner.id === ownerId),'pigeonspigeons');
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

            <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
                <Tab label="My Pigeons" />
                <Tab label="Other Pigeons" />
            </Tabs>

            {tabIndex === 0 && (
                <Grid container spacing={3} mt={2}>
                    {pigeons.filter((p) => String(p.owner.id === createdBy)).map((pigeon) => (
                        <Grid item xs={12} md={6} key={pigeon.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{pigeon.bloodLine}</Typography>
                                    <Typography variant="body2">Color: {pigeon.color}</Typography>
                                    <Typography variant="body2">Age: {pigeon.age}</Typography>
                                    <Box display="flex" justifyContent="space-between" mt={2}>
                                        <Button variant="outlined" color="secondary" onClick={() => handleViewPigeon(pigeon)}>View</Button>
                                        <Button variant="contained" color={pigeon.suspended ? "error" : "warning"} onClick={() => handleSuspendPigeon(pigeon.id)}>
                                            {pigeon.suspended ? "Un-Suspend" : "Suspend"}
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {tabIndex === 1 && (
                <Grid container spacing={3} mt={2}>
                    {allPigeons.filter((p) => String(p.owner.id !== ownerId)).map((pigeon) => (
                        <Grid item xs={12} md={6} key={pigeon.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{pigeon.bloodLine}</Typography>
                                    <Typography variant="body2">Color: {pigeon.color}</Typography>
                                    <Typography variant="body2">Age: {pigeon.age}</Typography>
                                    <Typography variant="body2">Owner: {pigeon.owner.name}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* View Pigeon History Popup */}
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

            {/* Create Pigeon Popup */}
            <Dialog open={openCreatePopup} onClose={() => setOpenCreatePopup(false)} fullWidth maxWidth="sm">
                <DialogTitle>Create New Pigeon</DialogTitle>
                <DialogContent>
                    <TextField fullWidth label="Pigeon Blood Line" margin="dense" value={newPigeon.bloodLine} onChange={(e) => setNewPigeon({ ...newPigeon, bloodLine: e.target.value })} />
                    <TextField fullWidth label="Color" margin="dense" value={newPigeon.color} onChange={(e) => setNewPigeon({ ...newPigeon, color: e.target.value })} />
                    <TextField fullWidth label="Age" margin="dense" value={newPigeon.age} onChange={(e) => setNewPigeon({ ...newPigeon, age: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCreatePopup(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleCreatePigeon} color="primary" variant="contained">Create</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default PigeonsDashboard;