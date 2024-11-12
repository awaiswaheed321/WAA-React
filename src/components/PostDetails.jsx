import CloseIcon from "@mui/icons-material/Close";
import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import {styled} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import {CommentsContainer} from "../containers/CommentsContainer.jsx";

const DemoPaper = styled(Paper)(({theme}) => ({
    width: 300,
    height: "auto",
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: "center",
    marginTop: 10,
}));

export const PostDetails = (props) => {
    return (
        <Stack direction="column" spacing={2} sx={{mt: 2, position: "relative"}}>
            <DemoPaper square={false}>
                <IconButton
                    aria-label="close"
                    onClick={props.handleCardClose}
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "grey.500",
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <Typography variant="h5" color="inherit" component="div" sx={{fontWeight: 'bold'}}>
                    Post Details
                </Typography>
                <Typography variant="body2">ID: {props.post.id}</Typography>
                <Typography variant="body2">Title: {props.post.title}</Typography>
                <Typography variant="body2">Author: {props.post.author}</Typography>
                <Typography variant="body2">Content: {props.post.content}</Typography>
                <Typography variant="h6" sx={{fontWeight: 'bold'}}>Comments</Typography>
                {(props.post.comments !== null && props.post.comments.length > 0) ?
                    <CommentsContainer comments={props.post.comments}/>
                    : <Typography variant="body2" sx={{fontWeight: 'bold'}}>WOW, Such Empty</Typography>}
                <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
                    <Button variant="outlined" color="error" onClick={() => props.handleDeletePost(props.post.id)}>
                        Delete Post
                    </Button>
                </Box>
            </DemoPaper>
        </Stack>
    );
};

PostDetails.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        comments: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
    handleCardClose: PropTypes.func.isRequired,
    handleDeletePost: PropTypes.func.isRequired,
};
