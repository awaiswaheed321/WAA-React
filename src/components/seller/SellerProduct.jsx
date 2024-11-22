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

function SellerProduct(props) {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex < props.images.length - 1 ? prevIndex + 1 : 0,
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : props.images.length - 1,
        );
    };

    return (
        <Card
            sx={{ minWidth: 300, maxWidth: 300 }}
            onClick={() => {
                navigate(`/dashboard/seller-products/${props.id}`);
            }}
        >
            <CardMedia
                component="img"
                height="200"
                image={props.images[currentImageIndex].imageUrl}
                alt={props.images[currentImageIndex].name}
            />
            <CardContent>
                <Typography variant="h6">{props.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.description}
                </Typography>
                <Typography variant="body1">
                    <strong>Price:</strong> ${props.price.toFixed(2)}
                </Typography>
                <Typography
                    variant="body2"
                    color={props.stock === 0 ? 'error' : 'text.primary'}
                >
                    <strong>Stock:</strong>{' '}
                    {props.stock === 0 ? 'Sold Out' : props.stock}
                </Typography>
                <Typography variant="body2">
                    <strong>Category:</strong> {props.category.name}
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button
                        variant="outlined"
                        onClick={handlePrevImage}
                        disabled={props.images.length <= 1}
                    >
                        Back
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleNextImage}
                        disabled={props.images.length <= 1}
                    >
                        Next
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

SellerProduct.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    category: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
    }).isRequired,
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            imageUrl: PropTypes.string.isRequired,
            contentType: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default SellerProduct;
