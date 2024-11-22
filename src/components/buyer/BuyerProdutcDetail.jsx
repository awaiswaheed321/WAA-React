import { ArrowBack, ArrowForward } from '@mui/icons-material';
import {
    Box,
    Button,
    Grid,
    IconButton,
    Paper,
    Rating,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAccessToken } from '../../cookies/AuthCookie.js';
import BuyerAPI from '../../services/BuyerAPI.js';
import HelperService from '../../services/HelperService.js';
import useSnackStore from '../../store/SnackStore.js';
import CustomSnackBar from '../base/CustomSnackBar.jsx';

const BuyerProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1); // Quantity state
    const navigate = useNavigate();
    const { openSnackBar, resetSnackProps } = useSnackStore();

    const fetchProduct = async () => {
        try {
            resetSnackProps();
            const res = await BuyerAPI.getProductById(getAccessToken(), id);
            if (res.ok) {
                const body = await res.json();
                setProduct(body);
            } else if (res.status === 403) {
                await handle403();
            } else {
                const body = await res.json();
                openSnackBar(body.message, 'error');
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const handle403 = async () => {
        openSnackBar('Your session has expired', 'error');
        await HelperService.delay(2000);
        navigate('/');
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const handleNextImage = () => {
        if (product && currentImageIndex < product.images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const handlePreviousImage = () => {
        if (product && currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    const handleAddToCart = async () => {
        if (quantity > product.stock) {
            openSnackBar('Entered quantity exceeds available stock!', 'error');
            return;
        }
        if (quantity <= 0) {
            openSnackBar('Quantity must be at least 1!', 'error');
            return;
        }

        try {
            resetSnackProps();
            const res = await BuyerAPI.addToCart(getAccessToken(), {
                productId: product.id,
                quantity: quantity,
            });
            if (res.ok) {
                openSnackBar('Product Added to Cart.', 'success');
                await HelperService.delay(1000);
                navigate(-1);
            } else if (res.status === 403) {
                await handle403();
            } else {
                const body = await res.json();
                openSnackBar(body.message, 'error');
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (!product) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ padding: 4 }}>
            {/* Top Buttons */}
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                sx={{ marginBottom: 2 }}
            >
                {/* Back Button */}
                <Grid item>
                    <Button
                        variant="contained"
                        sx={{ bgcolor: '#748CAB' }}
                        onClick={handleBack}
                    >
                        Back to Products
                    </Button>
                </Grid>

                {/* Add to Cart */}
                <Grid item>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item>
                            <TextField
                                type="number"
                                size="small"
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(Number(e.target.value))
                                }
                                InputProps={{ inputProps: { min: 1 } }}
                                label="Quantity"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                sx={{ bgcolor: '#748CAB' }}
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                            >
                                Add to Cart
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* Product Details */}
            <Typography variant="h4" gutterBottom>
                {product.name}
            </Typography>
            <Typography variant="body1" paragraph>
                {product.description}
            </Typography>
            <Typography variant="h6">Price: ${product.price}</Typography>
            <Typography
                variant="body1"
                color={product.stock === 0 ? 'error' : 'text.primary'}
            >
                Stock: {product.stock === 0 ? 'Sold Out' : product.stock}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Category: {product.category.name}
            </Typography>

            {/* Product Images */}
            <Box
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <IconButton
                    onClick={handlePreviousImage}
                    disabled={currentImageIndex === 0}
                >
                    <ArrowBack />
                </IconButton>
                <img
                    src={product.images[currentImageIndex].imageUrl}
                    alt={`Product Image ${currentImageIndex + 1}`}
                    style={{ maxWidth: '300px', margin: '0 20px' }}
                />
                <IconButton
                    onClick={handleNextImage}
                    disabled={currentImageIndex === product.images.length - 1}
                >
                    <ArrowForward />
                </IconButton>
            </Box>

            {/* Reviews */}
            <Typography variant="h6" sx={{ marginTop: 2 }}>
                Reviews
            </Typography>
            {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                    <Paper key={index} sx={{ padding: 2, marginTop: 1 }}>
                        <Rating
                            name="review-rating"
                            value={review.rating}
                            readOnly
                        />
                        <Typography variant="body2">
                            {review.comment}
                        </Typography>
                    </Paper>
                ))
            ) : (
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginTop: 1 }}
                >
                    No reviews as of yet
                </Typography>
            )}

            <CustomSnackBar />
        </Box>
    );
};

export default BuyerProductDetail;
