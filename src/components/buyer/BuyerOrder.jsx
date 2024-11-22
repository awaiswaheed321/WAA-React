import { ArrowBack, ArrowForward } from '@mui/icons-material';
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

function BuyerOrder(props) {
    const { product, quantity, status, totalPrice } = props;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();

    const handleNextImage = (event) => {
        event.stopPropagation();
        setCurrentImageIndex((prevIndex) =>
            prevIndex < product.images.length - 1 ? prevIndex + 1 : 0,
        );
    };

    const handlePrevImage = (event) => {
        event.stopPropagation();
        setCurrentImageIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : product.images.length - 1,
        );
    };

    return (
        <Card
            sx={{ maxWidth: 350, minWidth: 350, margin: '16px auto' }}
            onClick={() => {
                navigate(`/dashboard/buyer-orders/${props.id}`);
            }}
        >
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
                    <strong>Price:</strong> {product.price}
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
                        <ArrowBack />
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleNextImage}
                        disabled={product.images.length <= 1}
                    >
                        <ArrowForward />
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

BuyerOrder.propTypes = {
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
    status: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
};

export default BuyerOrder;
