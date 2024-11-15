import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const HeaderMenu = () => {
    const navigate = useNavigate();

    return (<Box sx={{flexGrow: 1}}>
        <Typography variant="h4" color="inherit" component="div">
            WAA - Lab 9
        </Typography>
        <AppBar position="static" sx={{mb: 1.25}}>
            <Toolbar variant="dense" sx={{justifyContent: 'center'}}>
                <Button onClick={() => navigate('/posts')} color="inherit" sx={{fontSize: '1.2rem', padding: '0.5rem 1.5rem', fontWeight: 'bold'}}>
                    Posts
                </Button>
                <Button onClick={() => navigate('/create-post')} color="inherit" sx={{fontSize: '1.2rem', padding: '0.5rem 1.5rem', fontWeight: 'bold'}}>
                    New Post
                </Button>
            </Toolbar>
        </AppBar>
    </Box>);
}

export default HeaderMenu;