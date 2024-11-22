import { Button, Rating } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { deleteAllCookies, getAccessToken } from '../../cookies/AuthCookie.js';
import SecureAdminApi from '../../services/AdminAPI.js';
import useSnackStore from '../../store/SnackStore.js';
import CustomSnackBar from '../base/CustomSnackBar.jsx';
import HelperService from '../../services/HelperService.js';

export default function AdminReview(props) {
    const { openSnackBar } = useSnackStore();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const res = await SecureAdminApi.deleteReview(
                getAccessToken(),
                props.id,
            );
            if (res.ok) {
                openSnackBar('Deleted Successfully', 'success');
                await HelperService.delay(2000);
                props.fetchReviews();
            } else if (res.status === 403) {
                await handle403();
            } else {
                const body = await res.body();
                openSnackBar(body.message, 'error');
            }
        } catch (error) {
            console.error('Error Rejecting Seller:', error);
        }
    };

    const handle403 = async () => {
        openSnackBar('Your session has expired', 'error');
        await HelperService.delay(2000);
        deleteAllCookies();
        navigate('/');
    };

    return (
        <div>
            <Card
                sx={{
                    minWidth: 300,
                    maxWidth: 300,
                    maxHeight: 200,
                    minHeight: 200,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        flex: 1,
                    }}
                >
                    <Box>
                        <Box sx={{ width: '100%', overflowWrap: 'break-word' }}>
                            <Typography
                                variant="body2"
                                sx={{ paddingRight: '60px' }}
                            >
                                <strong>ID:</strong> {`${props.id}`}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Product Name:</strong>{' '}
                                {props.productName}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Comment:</strong> {props.comment}
                            </Typography>
                            <Rating
                                name="review-rating"
                                value={props.rating}
                            />
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        flexWrap="wrap"
                        gap={2}
                        justifyContent="center"
                        color="success"
                        sx={{
                            marginTop: 'auto',
                        }}
                    >
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <CustomSnackBar />
        </div>
    );
}

AdminReview.propTypes = {
    id: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    comment: PropTypes.number.isRequired,
    fetchReviews: PropTypes.func.isRequired,
};
