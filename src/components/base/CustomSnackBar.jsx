import CloseIcon from '@mui/icons-material/Close';
import { Alert, IconButton, Slide, Snackbar } from '@mui/material';
import React, { useEffect } from 'react';
import useSnackStore from '../../store/SnackStore.js';

export default function CustomSnackBar() {
    const { snackProps, resetSnackProps } = useSnackStore();

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        resetSnackProps();
    };

    useEffect(() => {
        return () => {
            resetSnackProps();
        };
    }, []);

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
        <Snackbar
            open={snackProps.open}
            onClose={handleSnackBarClose}
            action={action}
            TransitionComponent={SlideTransition}
            autoHideDuration={3000}
            TransitionProps={{
                onExited: resetSnackProps,
            }}
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
    );
}
