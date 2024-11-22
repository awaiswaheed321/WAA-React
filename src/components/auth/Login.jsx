import {
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAllCookies } from '../../cookies/AuthCookie.js';
import AuthAPI from '../../services/AuthAPI.js';
import useSnackStore from '../../store/SnackStore.js';
import CustomSnackBar from '../base/CustomSnackBar.jsx';
import Footer from '../dashboard/Footer.jsx';

const Login = () => {
    const formRef = useRef(null);
    const navigate = useNavigate();
    const { openSnackBar } = useSnackStore();

    const handleSubmit = () => {
        const formElements = formRef.current.elements;
        const formData = {
            email: formElements.email.value.trim(),
            password: formElements.password.value,
        };

        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            openSnackBar('Enter a valid email address.', 'error');
            return;
        }
        if (!formData.password) {
            openSnackBar('Password must be at least 8 characters.', 'error');
            return;
        }
        handleLogin(formData).then();
    };

    const handleLogin = async (data) => {
        const res = await AuthAPI.login(data);
        if (!res.ok) {
            const error = await res.json();
            openSnackBar(error.message, 'error');
        } else {
            openSnackBar('Login Successful', 'success');

            const body = await res.json();
            setAllCookies(body.accessToken, body.refreshToken, body.user);
            navigate('/dashboard');
        }
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
                        onClick={() => navigate('/signUp')}
                    >
                        Sign up
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
                            Login
                        </Typography>
                        <form ref={formRef}>
                            <Grid container spacing={2}>
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
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSubmit}
                                        sx={{ bgcolor: '#748CAB' }}
                                    >
                                        Login
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

export default Login;
