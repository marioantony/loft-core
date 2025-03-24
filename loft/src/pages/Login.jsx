import React, {useEffect, useState} from 'react';
import API from '../utils/api.js';
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { Link,useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            navigate('/dashboard'); // or role-specific
        }
    }, []);

    const handleLogin = async () => {
        try {
            const res = await API.post('/users/login', { email, password });
            localStorage.setItem('jwtToken', res.data.token);
            localStorage.setItem('userRole', res.data.role);
            localStorage.setItem('userName', res.data.name);
            localStorage.setItem('userId', res.data.id);

            if (res.data.role === 'CLUB') navigate('/dashboard');
            else navigate('/dashboard');
        } catch (err) {
            alert('Login failed');
        }
    };
    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 10, textAlign: "center" }}>
                <Typography variant="h4">Login</Typography>
                <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <TextField fullWidth label="Password" type="password" margin="normal" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleLogin}>
                    Login
                </Button>
                <Typography sx={{ mt: 2 }}>
                    Don't have an account? <Link to="/Signup">Sign up</Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;
