import MenuIcon from '@mui/icons-material/Menu';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { deleteAllCookies } from '../cookies/AuthCookie';

const drawerWidth = 240;

const Dashboard = () => {
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleLogout = () => {
        deleteAllCookies();
        navigate('/login');
    };

    const handleDrawerItemClick = () => {
        // Close the drawer when an item is clicked
        setIsDrawerOpen(false);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    bgcolor: '#1D2D44',
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={toggleDrawer}
                        sx={{ marginRight: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        MarketPlace Pro
                    </Typography>
                    <Button
                        color="inherit"
                        sx={{ bgcolor: '#748CAB' }}
                        onClick={handleLogout}
                    >
                        Log out
                    </Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ display: 'flex', flexGrow: 1, pt: 8 }}>
                <Drawer
                    // variant="persistent"
                    open={isDrawerOpen}
                    sx={{
                        width: isDrawerOpen ? drawerWidth : 0,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            position: isDrawerOpen ? 'relative' : 'absolute',
                            visibility: isDrawerOpen ? 'visible' : 'hidden',
                            transition: 'width 0.3s ease, visibility 0.3s ease',
                        },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            <ListItem
                                button
                                component={Link}
                                to=""
                                onClick={handleDrawerItemClick}
                            >
                                <ListItemIcon>
                                    <PersonAddRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Welcome" />
                            </ListItem>
                        </List>
                        <List>
                            <ListItem
                                button
                                component={Link}
                                to="pending-sellers"
                                onClick={handleDrawerItemClick}
                            >
                                <ListItemIcon>
                                    <PersonAddRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Pending Sellers" />
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        bgcolor: 'background.default',
                        p: 3,
                        transition: 'margin-left 0.3s ease',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default Dashboard;
