import React from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 10, textAlign: "center" }}>
                <Typography variant="h4">Login</Typography>
                <TextField fullWidth label="Email" margin="normal" />
                <TextField fullWidth label="Password" type="password" margin="normal" />
                <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                    Login
                </Button>
                <Typography sx={{ mt: 2 }}>
                    Don't have an account? <Link to="/src/pages/Signup">Sign up</Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;
