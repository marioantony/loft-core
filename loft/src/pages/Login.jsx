import React, { useEffect, useState } from 'react';
import API from '../utils/api.js';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Grid
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            navigate('/dashboard');
        }
    }, []);

    const handleLogin = async () => {
        try {
            const res = await API.post('/users/login', { email, password });
            localStorage.setItem('jwtToken', res.data.token);
            localStorage.setItem('userRole', res.data.role);
            localStorage.setItem('userName', res.data.name);
            localStorage.setItem('userId', res.data.id);

            navigate('/dashboard');
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <Grid container sx={{ minHeight: "100vh" }}>
            {/* Left Side - Image */}
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    backgroundImage: 'url(https://t4.ftcdn.net/jpg/03/55/30/83/360_F_355308363_zMt8UmDC0n6XTqYMGQFawzduQFS4ENJ4.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: { xs: 'none', md: 'block' },
                }}
            />

            {/* Right Side - Login Form */}
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 3,
                }}
            >
                <Container maxWidth="xs">
                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant="h4" gutterBottom>
                            Login
                        </Typography>

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

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>

                        <Typography sx={{ mt: 2 }}>
                            Don't have an account? <Link to="/Signup">Sign up</Link>
                        </Typography>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    );
};

export default Login;
