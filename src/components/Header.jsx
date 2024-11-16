import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" color="inherit" component="div">
                Exam October 2022
            </Typography>
            <AppBar position="static" sx={{ mb: 1.25 }}>
                <Toolbar variant="dense" sx={{ justifyContent: 'center' }}>
                    <Button
                        onClick={() => navigate('/')}
                        color="inherit"
                        sx={{
                            fontSize: '1.2rem',
                            padding: '0.5rem 1.5rem',
                            fontWeight: 'bold',
                        }}
                    >
                        Students
                    </Button>
                    <Button
                        onClick={() => navigate('/add-student')}
                        color="inherit"
                        sx={{
                            fontSize: '1.2rem',
                            padding: '0.5rem 1.5rem',
                            fontWeight: 'bold',
                        }}
                    >
                        Add Student
                    </Button>
                    <Button
                        onClick={() => navigate('/selected-student')}
                        color="inherit"
                        sx={{
                            fontSize: '1.2rem',
                            padding: '0.5rem 1.5rem',
                            fontWeight: 'bold',
                        }}
                    >
                        Selected Student
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
