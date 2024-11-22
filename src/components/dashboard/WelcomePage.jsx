import {
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid2,
    Toolbar,
    Typography,
} from '@mui/material';
import Footer from './Footer';
import sellImage from '../../assets/sell.avif';
import buyImage from '../../assets/deals.avif';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <AppBar position="static" sx={{ bgcolor: '#1D2D44' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        MarketPlace Pro
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
                <Container>
                    <Typography variant="h3" align="center" gutterBottom>
                        Welcome to MarketPlace Pro
                    </Typography>
                    <Typography
                        variant="h6"
                        align="center"
                        color="textSecondary"
                        gutterBottom
                    >
                        Your one-stop solution for buying and selling everything
                        you need!
                    </Typography>

                    <Box display="flex" justifyContent="center" gap={2} my={4}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/login')}
                            sx={{ bgcolor: '#748CAB' }}
                        >
                            Login
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/signUp')}
                            sx={{ bgcolor: '#748CAB', color: '#FFF' }}
                        >
                            Sign Up
                        </Button>
                    </Box>

                    <Grid2
                        container
                        spacing={4}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid2 xs={12} sm={6} md={4}>
                            <Card sx={{ textAlign: 'center' }}>
                                <CardMedia
                                    component="img"
                                    image={sellImage}
                                    alt="Shopping"
                                    sx={{
                                        height: 'auto',
                                        maxHeight: 300,
                                        objectFit: 'contain',
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Explore Amazing Deals
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Find the best products at unbeatable
                                        prices!
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                        <Grid2 xs={12} sm={6} md={4}>
                            <Card sx={{ textAlign: 'center' }}>
                                <CardMedia
                                    component="img"
                                    image={buyImage}
                                    alt="Market"
                                    sx={{
                                        height: 'auto',
                                        maxHeight: 300,
                                        objectFit: 'contain',
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Sell Your Products
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Reach a vast audience and grow your
                                        business effortlessly.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                    </Grid2>
                </Container>
            </Box>

            <Footer />
        </Box>
    );
};

export default WelcomePage;
