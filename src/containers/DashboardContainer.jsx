import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import MenuIcon from '@mui/icons-material/Menu';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import SendIcon from '@mui/icons-material/Send';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import WavingHandRoundedIcon from '@mui/icons-material/WavingHandRounded';
import CategoryIcon from '@mui/icons-material/Category';
import {
    AppBar,
    Box,
    Button,
    ClickAwayListener,
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
import Footer from '../components/dashboard/Footer';
import UserRole from '../constants/UserRoles';
import { deleteAllCookies, getUserCookie } from '../cookies/AuthCookie';

const drawerWidth = 240;

const Dashboard = () => {
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const user = getUserCookie();

    const toggleDrawer = (event) => {
        event.stopPropagation();
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleLogout = () => {
        deleteAllCookies();
        navigate('/login');
    };

    const handleDrawerItemClick = () => {
        setIsDrawerOpen(false);
    };

    const handleClickAway = () => {
        if (isDrawerOpen) {
            setIsDrawerOpen(false);
        }
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
                    <Typography
                        variant="h6"
                        sx={{ flexGrow: 1, cursor: 'pointer' }}
                        onClick={() => {
                            navigate('/dashboard');
                        }}
                    >
                        MarketPlace Pro
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            marginRight: 2,
                            color: 'white',
                            fontWeight: 'bold',
                        }}
                    >
                        {`${user.firstName} ${user.lastName}`}
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
                <ClickAwayListener
                    onClickAway={(event) => {
                        if (
                            isDrawerOpen &&
                            event.target.closest('.MuiDrawer-paper')
                        ) {
                            return;
                        }
                        handleClickAway();
                    }}
                >
                    <Drawer
                        open={isDrawerOpen}
                        sx={{
                            width: isDrawerOpen ? drawerWidth : 0,
                            flexShrink: 0,
                            [`& .MuiDrawer-paper`]: {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                                transition: 'width 0.3s ease',
                            },
                        }}
                    >
                        <Toolbar />
                        <Box sx={{ overflow: 'auto' }}>
                            <List>
                                {/* Welcome Page */}
                                <ListItem
                                    button
                                    component={Link}
                                    to=""
                                    onClick={handleDrawerItemClick}
                                >
                                    <ListItemIcon>
                                        <WavingHandRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Welcome" />
                                </ListItem>
                                {/* Admin's Pending Seller */}
                                {user.role === UserRole.ADMIN && (
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
                                )}
                                {/* Admin's Reviews */}
                                {user.role === UserRole.ADMIN && (
                                    <ListItem
                                        button
                                        component={Link}
                                        to="admin-reviews"
                                        onClick={handleDrawerItemClick}
                                    >
                                        <ListItemIcon>
                                            <RateReviewRoundedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Reviews" />
                                    </ListItem>
                                )}
                                {/* Admin's Categories */}
                                {user.role === UserRole.ADMIN && (
                                    <ListItem
                                        button
                                        component={Link}
                                        to="categories"
                                        onClick={handleDrawerItemClick}
                                    >
                                        <ListItemIcon>
                                            <CategoryIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Categories" />
                                    </ListItem>
                                )}
                                {/* Seller's Create Product */}
                                {user.role === UserRole.SELLER &&
                                    user.approved && (
                                        <ListItem
                                            button
                                            component={Link}
                                            to="create-product"
                                            onClick={handleDrawerItemClick}
                                        >
                                            <ListItemIcon>
                                                <NoteAddRoundedIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Create Product" />
                                        </ListItem>
                                    )}
                                {/* Seller's Products Container*/}
                                {user.role === UserRole.SELLER &&
                                    user.approved && (
                                        <ListItem
                                            button
                                            component={Link}
                                            to="seller-products"
                                            onClick={handleDrawerItemClick}
                                        >
                                            <ListItemIcon>
                                                <CategoryRoundedIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Products" />
                                        </ListItem>
                                    )}
                                {/* Seller's Order Container*/}
                                {user.role === UserRole.SELLER &&
                                    user.approved && (
                                        <ListItem
                                            button
                                            component={Link}
                                            to="seller-orders"
                                            onClick={handleDrawerItemClick}
                                        >
                                            <ListItemIcon>
                                                <LocalMallIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Orders" />
                                        </ListItem>
                                    )}
                                {/* Buyer View Products Container */}
                                {user.role === UserRole.BUYER && (
                                    <ListItem
                                        button
                                        component={Link}
                                        to="buyer-products"
                                        onClick={handleDrawerItemClick}
                                    >
                                        <ListItemIcon>
                                            <CategoryRoundedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Products" />
                                    </ListItem>
                                )}
                                {/* Buyer's Orders */}
                                {user.role === UserRole.BUYER && (
                                    <ListItem
                                        button
                                        component={Link}
                                        to="buyer-orders"
                                        onClick={handleDrawerItemClick}
                                    >
                                        <ListItemIcon>
                                            <LocalMallIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Orders" />
                                    </ListItem>
                                )}
                                {/* Buyer's Cart */}
                                {user.role === UserRole.BUYER && (
                                    <ListItem
                                        button
                                        component={Link}
                                        to="cart"
                                        onClick={handleDrawerItemClick}
                                    >
                                        <ListItemIcon>
                                            <ShoppingCartOutlinedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Cart" />
                                    </ListItem>
                                )}
                                {/* Buyer's Address */}
                                {user.role === UserRole.BUYER && (
                                    <ListItem
                                        button
                                        component={Link}
                                        to="address"
                                        onClick={handleDrawerItemClick}
                                    >
                                        <ListItemIcon>
                                            <SendIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Addresses" />
                                    </ListItem>
                                )}
                            </List>
                        </Box>
                    </Drawer>
                </ClickAwayListener>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        bgcolor: 'background.default',
                        p: 3,
                        transition: 'margin-left 0.3s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: isDrawerOpen ? `${drawerWidth}px` : '0px',
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
