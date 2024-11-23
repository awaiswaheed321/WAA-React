import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const CartItem = ({
    id,
    productName,
    quantity,
    pricePerUnit,
    totalPrice,
    handleRemoveClick,
    handlePlaceOrderClick,
}) => {
    return (
        <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
            <Box>
                {/* Product Details */}
                <Typography variant="h6">{productName}</Typography>
                <Typography variant="body1">Quantity: {quantity}</Typography>
                <Typography variant="body1">
                    Price per Unit: ${pricePerUnit.toFixed(2)}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                    Total Price: ${totalPrice.toFixed(2)}
                </Typography>
            </Box>

            {/* Action Buttons */}
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={async () => {
                            await handleRemoveClick(id);
                        }}
                    >
                        Remove Item
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={async () => {
                            await handlePlaceOrderClick(id);
                        }}
                    >
                        Place Order
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

CartItem.propTypes = {
    id: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    pricePerUnit: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    handleRemoveClick: PropTypes.func.isRequired,
    handlePlaceOrderClick: PropTypes.func.isRequired,
};

export default CartItem;
