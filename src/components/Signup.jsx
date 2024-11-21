import {
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthApi from '../services/AuthApi.js';
import useSnackStore from '../store/SnackStore.js';
import CustomSnackBar from './CustomSnackBar.jsx';
import Footer from './Footer.jsx';

const SignUp = () => {
    const formRef = useRef(null);
    const { openSnackBar } = useSnackStore();
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
            openSnackBar('First name is required.', 'error');
            return;
        }
        if (!formData.lastName) {
            openSnackBar('Last name is required.', 'error');
            return;
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            openSnackBar('Enter a valid email address.', 'error');
            return;
        }
        if (!formData.password || formData.password.length < 8) {
            openSnackBar('Password must be at least 8 characters.', 'error');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            openSnackBar('Passwords do not match.', 'error');
            return;
        }
        const newFormData = { ...formData };
        delete newFormData.confirmPassword;
        handleSignUp(newFormData).then();
    };

    const handleSignUp = async (data) => {
        const res = await AuthApi.signup(data);
        if (!res.ok) {
            const error = await res.json();
            openSnackBar(error.message, 'error');
        } else {
            const success = await res.json();
            openSnackBar(generateWelcomeMessage(success), 'success');
            resetForm();
            await delay(2000);
            navigate('/login');
        }
    };

    const resetForm = () => {
        if (formRef.current) {
            const formElements = formRef.current.elements;
            formElements.firstName.value = '';
            formElements.lastName.value = '';
            formElements.email.value = '';
            formElements.password.value = '';
            formElements.confirmPassword.value = '';
            formElements.role.value = 'BUYER';
        }
    };

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const generateWelcomeMessage = (res) => {
        const { firstName, lastName } = res;
        return `🎉 Congrats, ${firstName} ${lastName}! You're registered. Redirecting to the signup page... 🚀`;
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <AppBar position="static" sx={{ bgcolor: '#1D2D44' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        MarketPlace Pro
                    </Typography>
                    <Button
                        color="inherit"
                        sx={{ bgcolor: '#748CAB' }}
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </Button>
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
                                    <FormControl
                                        fullWidth
                                        sx={{ marginBottom: 1 }}
                                    >
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
                                        sx={{ bgcolor: '#748CAB' }}
                                    >
                                        SIGN UP
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={() => navigate('/')}
                                        sx={{ bgcolor: '#748CAB' }}
                                    >
                                        Homepage
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>

                <CustomSnackBar />
            </Box>
            <Footer />
        </Box>
    );
};

export default SignUp;
