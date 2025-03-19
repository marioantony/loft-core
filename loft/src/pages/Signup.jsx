import React from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 10, textAlign: "center" }}>
                <Typography variant="h4">Sign Up</Typography>
                <TextField fullWidth label="Name" margin="normal" />
                <TextField fullWidth label="Email" margin="normal" />
                <TextField fullWidth label="Password" type="password" margin="normal" />
                <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
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
