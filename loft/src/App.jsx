import React, { useState } from "react";
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import store from "./store/store.js";
import AppContent from "./components/AppContent.jsx"


const theme = createTheme({
    palette: {
        primary: { main: "#1976d2" },
        secondary: { main: "#dc004e" },
        background: { default: "#f4f6f8" },
    },
    typography: {
        fontFamily: "'Roboto', sans-serif",
    },
});



function App() {
    const [open, setOpen] = useState(true);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };


    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <AppContent open={open} handleDrawerToggle={handleDrawerToggle} />
                </Router>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
