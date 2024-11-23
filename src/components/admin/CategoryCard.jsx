import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import CustomSnackBar from '../base/CustomSnackBar';

const CategoryCard = ({ id, name, description, onDelete }) => {
    const handleDelete = () => {
        onDelete(id);
    };

    return (
        <Card
            sx={{
                minWidth: 250,
                maxWidth: 250,
                minHeight: 150,
                maxHeight: 150,
                margin: 2,
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flexGrow: 1,
                }}
            >
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        maxWidth: '100%',
                    }}
                >
                    {name}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        maxWidth: '100%',
                    }}
                >
                    {description}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', width: '100%' }}>
                <Button
                    size="small"
                    color="error"
                    variant="contained"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </CardActions>
            <CustomSnackBar />
        </Card>
    );
};

CategoryCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default CategoryCard;
