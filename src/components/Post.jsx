import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import {Chip} from "@mui/material";
import Box from "@mui/material/Box";

const Post = (props) => {
    return (<Card
        sx={{minWidth: 290, maxWidth: 290}}
        onClick={() => {
            props.handleCardClick(props.id);
        }}
    >
        <CardContent>
            <Box position="relative">
                <Chip
                    label={`ID: ${props.id}`}
                    color="primary"
                    sx={{position: "absolute", top: 0, right: 0}}
                />
                <Box sx={{width: "100%", overflowWrap: "break-word"}}>
                    <Typography variant="body2" sx={{paddingRight: "60px"}}>
                        <strong>Title:</strong> {props.title}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Author:</strong> {props.author}
                    </Typography>
                </Box>
            </Box>
        </CardContent>
    </Card>);
};

Post.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    handleCardClick: PropTypes.func.isRequired,
};

export default Post;
