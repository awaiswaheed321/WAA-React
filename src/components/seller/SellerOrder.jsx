import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderStatus } from '../../constants/OrderStatus';
import { deleteAllCookies, getAccessToken } from '../../cookies/AuthCookie';
import HelperService from '../../services/HelperService';
import SellerAPI from '../../services/SellerAPI';
import useSnackStore from '../../store/SnackStore';
import CustomSnackBar from '../base/CustomSnackBar';

function SellerOrder(props) {
    const { id, product, quantity, status, totalPrice } = props;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { openSnackBar } = useSnackStore();
    const navigate = useNavigate();
    console.log("Comp:", getAccessToken())
    const handleUpdateStatus = async (newStatus) => {
        console.log('New Status:', newStatus);
        try {
            const res = await SellerAPI.updateOrderStatus(
                getAccessToken(),
                id,
                newStatus,
            );
            console.log(res);
            if (res.ok) {
                openSnackBar('Update Successful', 'success');
                await HelperService.delay(2000);
                props.fetchOrders();
            } else if (res.status === 403) {
                openSnackBar('Your session has expired', 'error');
                await HelperService.delay(2000);
                deleteAllCookies();
                navigate('/');
            } else {
                const body = await res.body();
                openSnackBar(body.message, 'error');
            }
        } catch (error) {
            console.error('Error Updating Order Status:', error);
        }
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex < product.images.length - 1 ? prevIndex + 1 : 0,
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : product.images.length - 1,
        );
    };

    const renderStatusButtons = () => {
        switch (status) {
            case OrderStatus.PENDING:
                return (
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        gap={2}
                    >
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() =>
                                handleUpdateStatus(OrderStatus.SHIPPED)
                            }
                            size="medium" // Consistent size
                        >
                            Mark as Shipped
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() =>
                                handleUpdateStatus(OrderStatus.CANCELLED)
                            }
                            size="medium" // Consistent size
                        >
                            Cancel Order
                        </Button>
                    </Box>
                );
            case OrderStatus.SHIPPED:
                return (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                                handleUpdateStatus(OrderStatus.ON_THE_WAY)
                            }
                            size="medium" // Consistent size
                        >
                            Mark as On The Way
                        </Button>
                    </Box>
                );
            case OrderStatus.ON_THE_WAY:
                return (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() =>
                                handleUpdateStatus(OrderStatus.DELIVERED)
                            }
                            size="medium" // Consistent size
                        >
                            Mark as Delivered
                        </Button>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Card sx={{ maxWidth: 350, minWidth: 350, margin: '16px auto' }}>
            <CardMedia
                component="img"
                height="200"
                image={product.images[currentImageIndex]?.imageUrl}
                alt={product.images[currentImageIndex]?.name}
            />
            <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
                <Typography variant="body1">
                    <strong>Quantity:</strong> {quantity}
                </Typography>
                <Typography variant="body1">
                    <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                    <strong>Status:</strong> {status}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Category:</strong> {product.category.name}
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button
                        variant="outlined"
                        onClick={handlePrevImage}
                        disabled={product.images.length <= 1}
                    >
                        Back
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleNextImage}
                        disabled={product.images.length <= 1}
                    >
                        Next
                    </Button>
                </Box>
                <Box mt={2} display="flex" justifyContent="flex-start">
                    {renderStatusButtons()}
                </Box>
            </CardContent>
            <CustomSnackBar />
        </Card>
    );
}

SellerOrder.propTypes = {
    id: PropTypes.number.isRequired,
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired,
        category: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        }).isRequired,
        images: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                imageUrl: PropTypes.string.isRequired,
            }),
        ).isRequired,
    }).isRequired,
    quantity: PropTypes.number.isRequired,
    status: PropTypes.oneOf(Object.values(OrderStatus)).isRequired,
    totalPrice: PropTypes.number.isRequired,
    fetchOrders: PropTypes.func.isRequired,
};

export default SellerOrder;
