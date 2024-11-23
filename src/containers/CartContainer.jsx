import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CustomSnackBar from '../components/base/CustomSnackBar.jsx';
import CartItem from '../components/buyer/CartItem.jsx';
import { deleteAllCookies, getAccessToken } from '../cookies/AuthCookie.js';
import BuyerAPI from '../services/BuyerAPI.js';
import HelperService from '../services/HelperService.js';
import useSnackStore from '../store/SnackStore.js';

export default function CartContainer() {
    const [items, setItems] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { openSnackBar, resetSnackProps } = useSnackStore();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: 'onBlur',
    });

    const fetchCartItems = async () => {
        try {
            const res = await BuyerAPI.getCart(getAccessToken());
            if (res.ok) {
                const body = await res.json();
                setItems(body.items || []);
            } else if (res.status === 403) {
                await handle403();
            } else {
                const body = await res.json();
                openSnackBar(body.message, 'error');
            }
        } catch (error) {
            console.error('Error fetching Cart:', error);
        }
    };

    // Fetch Addresses
    const fetchAddresses = async () => {
        try {
            const res = await BuyerAPI.fetchAddresses(getAccessToken());
            if (res.ok) {
                const body = await res.json();
                setAddresses(body || []);
            } else if (res.status === 403) {
                await handle403();
            } else {
                const body = await res.json();
                openSnackBar(body.message, 'error');
            }
        } catch (error) {
            console.error('Error fetching Cart:', error);
        }
    };

    // Handle 403 error (unauthenticated)
    const handle403 = async () => {
        openSnackBar('Your session has expired', 'error');
        await HelperService.delay(2000);
        deleteAllCookies();
        navigate('/');
    };

    // Handle Remove Item from Cart
    const handleRemoveClick = async (id) => {
        try {
            const res = await BuyerAPI.removeItemFromCart(getAccessToken(), id);
            if (res.ok) {
                openSnackBar('Item Removed', 'success');
                await HelperService.delay(1000);
                await fetchCartItems();
            } else if (res.status === 403) {
                await handle403();
            } else {
                const body = await res.json();
                openSnackBar(body.message, 'error');
            }
        } catch (error) {
            console.error('Error fetching Cart:', error);
        }
    };

    // Handle Place Order Click
    const handlePlaceOrderClick = (item) => {
        setSelectedItem(item);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    // Handle Order Submission
    const handleOrderSubmission = async (data) => {
        try {
            const res = await BuyerAPI.createOrder(getAccessToken(), {
                productId: selectedItem.id,
                quantity: selectedItem.quantity,
                billingAddressId: data.billingAddress,
                shippingAddressId: data.shippingAddress,
            });
            if (res.ok) {
                openSnackBar('Order Placed', 'success');
                reset();
                await BuyerAPI.removeItemFromCart(
                    getAccessToken(),
                    selectedItem.id,
                );
                await HelperService.delay(1000);
                await fetchCartItems();
            } else if (res.status === 403) {
                await handle403();
            } else {
                const body = await res.json();
                openSnackBar(body.message, 'error');
            }
        } catch (error) {
            console.error('Error fetching Cart:', error);
        }
        setOpenModal(false);
    };

    useEffect(() => {
        resetSnackProps();
        fetchCartItems();
        fetchAddresses();
        const interval = setInterval(() => {
            fetchCartItems();
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    // Render Cart Items
    const itemsList =
        items.length > 0 ? (
            items.map((p) => (
                <CartItem
                    key={p.id}
                    {...p}
                    handlePlaceOrderClick={() => handlePlaceOrderClick(p)}
                    handleRemoveClick={handleRemoveClick}
                />
            ))
        ) : (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    mt: 2,
                }}
            >
                <Typography variant="h4" color="textSecondary">
                    Cart is Empty.
                </Typography>
            </Box>
        );

    return (
        <div>
            <Typography
                variant="h3"
                color="textSecondary"
                sx={{ fontWeight: 'bold' }}
            >
                Cart
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
                {itemsList}
            </Box>

            {/* Modal for Order Details */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: 'white',
                        padding: 3,
                        borderRadius: 2,
                        boxShadow: 24,
                        width: '400px',
                        maxHeight: '80vh',
                        overflowY: 'auto',
                    }}
                >
                    <Typography variant="h6" mb={2}>
                        Select Addresses for Shipping and Billing
                    </Typography>

                    {/* Shipping Address Selection */}
                    <FormControl
                        fullWidth
                        margin="normal"
                        error={!!errors.shippingAddress}
                    >
                        <InputLabel>Shipping Address</InputLabel>
                        <Select
                            {...register('shippingAddress', {
                                required: 'Shipping address is required',
                            })}
                            label="Shipping Address"
                        >
                            {addresses.map((address) => (
                                <MenuItem key={address.id} value={address.id}>
                                    {address.street}, {address.city},{' '}
                                    {address.country}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.shippingAddress && (
                            <Typography color="error">
                                {errors.shippingAddress.message}
                            </Typography>
                        )}
                    </FormControl>

                    {/* Billing Address Selection */}
                    <FormControl
                        fullWidth
                        margin="normal"
                        error={!!errors.billingAddress}
                    >
                        <InputLabel>Billing Address</InputLabel>
                        <Select
                            {...register('billingAddress', {
                                required: 'Billing address is required',
                            })}
                            label="Billing Address"
                        >
                            {addresses.map((address) => (
                                <MenuItem key={address.id} value={address.id}>
                                    {address.street}, {address.city},{' '}
                                    {address.country}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.billingAddress && (
                            <Typography color="error">
                                {errors.billingAddress.message}
                            </Typography>
                        )}
                    </FormControl>

                    {/* Card Payment Credentials */}
                    <Box mt={3}>
                        <Typography variant="body1" mb={1}>
                            Card Payment Details
                        </Typography>
                        <TextField
                            label="Card Number"
                            variant="outlined"
                            fullWidth
                            {...register('cardNumber', {
                                required: 'Card number is required',
                                pattern: {
                                    value: /^[0-9]{16}$/,
                                    message: 'Card number must be 16 digits',
                                },
                            })}
                            error={!!errors.cardNumber}
                            helperText={errors.cardNumber?.message}
                            margin="normal"
                        />
                        <TextField
                            label="Expiry Date (MM/YY)"
                            variant="outlined"
                            fullWidth
                            {...register('expiryDate', {
                                required: 'Expiry date is required',
                                pattern: {
                                    value: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
                                    message: 'Invalid date format (MM/YY)',
                                },
                            })}
                            error={!!errors.expiryDate}
                            helperText={errors.expiryDate?.message}
                            margin="normal"
                        />
                        <TextField
                            label="CVV"
                            variant="outlined"
                            fullWidth
                            {...register('cvv', {
                                required: 'CVV is required',
                                pattern: {
                                    value: /^[0-9]{3}$/,
                                    message: 'CVV must be 3 digits',
                                },
                            })}
                            error={!!errors.cvv}
                            helperText={errors.cvv?.message}
                            margin="normal"
                        />
                    </Box>

                    {/* Order Submit Button */}
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleSubmit(handleOrderSubmission)}
                    >
                        Place Order
                    </Button>
                </Box>
            </Modal>
            <CustomSnackBar />
        </div>
    );
}
