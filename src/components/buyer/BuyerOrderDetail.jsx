import { ArrowBack, ArrowForward, Close } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    IconButton,
    Modal,
    Rating,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAccessToken } from '../../cookies/AuthCookie';
import BuyerAPI from '../../services/BuyerAPI.js';
import HelperService from '../../services/HelperService.js';
import useSnackStore from '../../store/SnackStore.js';
import CustomSnackBar from '../base/CustomSnackBar.jsx';

function BuyerOrderDetail() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [openReviewModal, setOpenReviewModal] = useState(false);
    const [reviewComment, setReviewComment] = useState('');
    const [reviewRating, setReviewRating] = useState(0);
    const { openSnackBar, resetSnackProps } = useSnackStore();
    const navigate = useNavigate();

    const fetchOrder = async () => {
        try {
            resetSnackProps();
            const res = await BuyerAPI.getBuyerOrderById(getAccessToken(), id);
            if (res.ok) {
                const body = await res.json();
                setOrder(body);
            } else if (res.status === 403) {
                await handle403();
            } else {
                const body = await res.json();
                openSnackBar(body.message, 'error');
            }
        } catch (error) {
            console.error('Error fetching order:', error);
        }
    };

    const handle403 = async () => {
        openSnackBar('Your session has expired', 'error');
        await HelperService.delay(2000);
        navigate('/');
    };

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? product.images.length - 1 : prevIndex - 1,
        );
    };

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === product.images.length - 1 ? 0 : prevIndex + 1,
        );
    };

    const goBack = () => {
        navigate(-1);
    };

    if (!order) {
        return (
            <Container>
                <Typography variant="h6" textAlign="center" mt={4}>
                    Loading Order Details...
                </Typography>
            </Container>
        );
    }

    const {
        product,
        quantity,
        status,
        totalPrice,
        shippingAddress,
        billingAddress,
        review,
    } = order;

    const cancelOrder = async () => {
        try {
            resetSnackProps();
            const res = await BuyerAPI.cancelOrder(getAccessToken(), id);
            if (res.ok) {
                openSnackBar('Order Cancelled', 'info');
                await HelperService.delay(1000);
                goBack();
            } else if (res.status === 403) {
                await handle403();
            } else {
                const body = await res.json();
                openSnackBar(body.message, 'error');
            }
        } catch (error) {
            console.error('Error cancelling order:', error);
        }
    };

    const reviewOrder = () => {
        setOpenReviewModal(true);
    };

    const addReview = async () => {
        if (reviewComment.trim() === '' || reviewRating === 0) {
            openSnackBar('Please provide a comment and rating', 'warning');
            return;
        }

        try {
            resetSnackProps();
            const res = await BuyerAPI.reviewOrder(getAccessToken(), {
                orderId: id,
                comment: reviewComment,
                rating: reviewRating,
                productId: product.id,
            });

            if (res.ok) {
                setOpenReviewModal(false);
                openSnackBar('Review Added', 'success');
                await HelperService.delay(1000);
                fetchOrder();
            } else if (res.status === 403) {
                await handle403();
            } else {
                const body = await res.json();
                openSnackBar(body.message, 'error');
            }
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Button variant="contained" onClick={goBack} sx={{ bgcolor: '#748CAB' }}>
                    Back
                </Button>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h4">Order Details</Typography>
                </Box>
                {status === 'PENDING' && (
                    <Button variant="contained" color="error" onClick={cancelOrder}>
                        Cancel Order
                    </Button>
                )}

                {status === 'DELIVERED' && !review && (
                    <Button variant="contained" onClick={reviewOrder} sx={{ bgcolor: '#748CAB' }}>
                        Leave Review
                    </Button>
                )}
            </Box>

            <Card sx={{ position: 'relative' }}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Button onClick={goToPreviousImage}>
                        <ArrowBack />
                    </Button>
                    <CardMedia
                        component="img"
                        height="300"
                        image={product.images[currentImageIndex]?.imageUrl}
                        alt={product.images[currentImageIndex]?.name}
                    />
                    <Button onClick={goToNextImage}>
                        <ArrowForward />
                    </Button>
                </Box>
                <CardContent>
                    <Typography variant="h5">{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.description}
                    </Typography>
                    <Box mt={2}>
                        <Typography variant="body1"><strong>Category:</strong> {product.category.name}</Typography>
                        <Typography variant="body1"><strong>Quantity:</strong> {quantity}</Typography>
                        <Typography variant="body1"><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</Typography>
                        <Typography variant="body1"><strong>Status:</strong> {status}</Typography>
                    </Box>

                    <Box mt={4}>
                        <Typography variant="h6">Shipping Address</Typography>
                        <Typography variant="body2">
                            {shippingAddress.street}, {shippingAddress.city}, {shippingAddress.state}, {shippingAddress.zipCode}, {shippingAddress.country}
                        </Typography>
                    </Box>

                    <Box mt={4}>
                        <Typography variant="h6">Billing Address</Typography>
                        <Typography variant="body2">
                            {billingAddress.street}, {billingAddress.city}, {billingAddress.state}, {billingAddress.zipCode}, {billingAddress.country}
                        </Typography>
                    </Box>

                    {/* Review Section */}
                    {status === 'DELIVERED' && review && (
                        <Box mt={4}>
                            <Typography variant="h6">Your Review</Typography>
                            <Typography variant="body2">{review.comment}</Typography>
                            <Rating name="review-rating" value={review.rating} readOnly />
                        </Box>
                    )}
                </CardContent>
            </Card>

            {/* Modal for Review */}
            <Modal open={openReviewModal} onClose={() => setOpenReviewModal(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        width: 400,
                    }}
                >
                    <Box display="flex" justifyContent="space-between" mb={2}>
                        <Typography variant="h6">Leave a Review</Typography>
                        <IconButton onClick={() => setOpenReviewModal(false)}>
                            <Close />
                        </IconButton>
                    </Box>
                    <TextField
                        fullWidth
                        label="Your Comment"
                        multiline
                        rows={4}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Rating
                        name="review-rating"
                        value={reviewRating}
                        onChange={(event, newValue) => setReviewRating(newValue)}
                        sx={{ mb: 2 }}
                    />
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button onClick={() => setOpenReviewModal(false)} variant="outlined" color="error">
                            Cancel
                        </Button>
                        <Button onClick={addReview} variant="contained">
                            Add Review
                        </Button>
                    </Stack>
                </Box>
            </Modal>

            <CustomSnackBar />
        </Container>
    );
}

export default BuyerOrderDetail;
