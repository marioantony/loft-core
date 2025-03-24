import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api.js";

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('PIGEONER'); // or default CLUB if needed

    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const res = await API.post('/users/register', {
                name,
                email,
                password,
                role,
            });

            alert("Registration successful!");
            navigate('/'); // redirect to login
        } catch (err) {
            alert("Registration failed. Email might already be used.");
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 10, textAlign: "center" }}>
                <Typography variant="h4">Sign Up</Typography>

                <TextField
                    fullWidth
                    label="Name"
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* You can use a dropdown or fixed role for now */}
                {/* Optional: Add role toggle if needed */}
                <FormControl fullWidth margin="normal">
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        value={role}
                        label="Role"
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <MenuItem value="PIGEONER">PIGEONER</MenuItem>
                        <MenuItem value="CLUB">CLUB</MenuItem>
                    </Select>
                </FormControl>


                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleSignup}
                >
                    Sign Up
                </Button>

                <Typography sx={{ mt: 2 }}>
                    Already have an account? <Link to="/">Login</Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Signup;
