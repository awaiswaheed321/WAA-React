import React, { useRef, useState } from 'react';
import {
    Alert,
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    Slide,
    Snackbar,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DataService from '/src/services/DataService.js';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer.jsx';

const Signup = () => {
    const formRef = useRef(null);
    const [snackProps, setSnackProps] = useState({
        open: false,
        message: '',
        severity: 'info',
    });
    const navigate = useNavigate();

    const handleSubmit = () => {
        const formElements = formRef.current.elements;
        const formData = {
            firstName: formElements.firstName.value.trim(),
            lastName: formElements.lastName.value.trim(),
            email: formElements.email.value.trim(),
            password: formElements.password.value,
            confirmPassword: formElements.confirmPassword.value,
            role: formElements.role.value,
        };

        if (!formData.firstName) {
            openSnackbar('First name is required.', 'error');
            return;
        }
        if (!formData.lastName) {
            openSnackbar('Last name is required.', 'error');
            return;
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            openSnackbar('Enter a valid email address.', 'error');
            return;
        }
        if (!formData.password || formData.password.length < 8) {
            openSnackbar('Password must be at least 8 characters.', 'error');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            openSnackbar('Passwords do not match.', 'error');
            return;
        }
        const newFormData = { ...formData };
        delete newFormData.confirmPassword;
        handleSignup(newFormData).then();
    };

    const openSnackbar = (message, severity) => {
        console.log('open snackbar');
        setSnackProps({
            message: message,
            open: true,
            severity: severity,
        });
    };

    const handleSignup = async (data) => {
        console.log('Signup Data:', data);
        try {
            const res = await DataService.signup(data);
            openSnackbar(generateWelcomeMessage(res), 'success');
            await delay(3000);
            navigate('/');
        } catch (error) {
            openSnackbar(error.message, 'error');
        }
    };

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const generateWelcomeMessage = (res) => {
        const { firstName, lastName } = res;
        return `🎉 Congrats, ${firstName} ${lastName}! You're registered. Redirecting to the signup page... 🚀`;
    };

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackProps({ ...snackProps, open: false, message: '', severity: 'info' });
    };


    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackBarClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <AppBar position="static" sx={{ bgcolor: '#1D2D44' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        MarketPlace Pro
                    </Typography>
                    <Button color="inherit" sx={{bgcolor: '#748CAB'}}>Login</Button>
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    backgroundColor: '#f0f2f5',
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Card sx={{ width: 400, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom align="center">
                            Signup
                        </Typography>
                        <form ref={formRef}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        name="firstName"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        name="lastName"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        type="email"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        type="password"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth sx={{ marginBottom: 1 }}>
                                        <Typography variant="subtitle1" mb={1}>
                                            Sign up as:
                                        </Typography>
                                        <RadioGroup
                                            name="role"
                                            defaultValue="BUYER"
                                            row
                                        >
                                            <FormControlLabel
                                                value="BUYER"
                                                control={<Radio />}
                                                label="Buyer"
                                            />
                                            <FormControlLabel
                                                value="SELLER"
                                                control={<Radio />}
                                                label="Seller"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSubmit}
                                        sx={{bgcolor: '#748CAB'}}
                                    >
                                        Signup
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={() => navigate('/')}
                                        sx={{bgcolor: '#748CAB'}}
                                    >
                                        Homepage
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>

                <Snackbar
                    open={snackProps.open}
                    onClose={handleSnackBarClose}
                    action={action}
                    TransitionComponent={SlideTransition}
                    autoHideDuration={3000}
                >
                    <Alert
                        onClose={handleSnackBarClose}
                        severity={snackProps.severity}
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {snackProps.message}
                    </Alert>
                </Snackbar>
            </Box>
            <Footer />
        </Box>
    );

};

export default Signup;
