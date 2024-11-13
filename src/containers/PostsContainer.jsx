import {Box} from "@mui/material";
import PropTypes from "prop-types";
import Post from "../components/Post.jsx";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const PostsContainer = (props) => {
    const postList = props.posts.map((p) => (
        <Post
            key={p.id}
            id={p.id}
            title={p.title}
            author={p.author}
            handleCardClick={props.handleCardClick}
        />
    ));

    return (
        <Box sx={{ marginTop: 2, marginBottom: 2 }}>
            <Box display="flex" flexWrap="wrap" gap={2} justifyContent="space-between" alignItems="center">
                <Typography variant="h5" color="inherit" component="div" sx={{ fontWeight: 'bold', marginBottom: 2, marginLeft: 2 }}>
                    Posts
                </Typography>
                <Button variant="outlined" onClick={props.openCreatePost} sx={{marginRight: 2}}>
                    Create Post
                </Button>
            </Box>
            <Box display="flex" flexWrap="wrap" gap={2}>
                {postList}
            </Box>
        </Box>
    );
};

PostsContainer.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
        })
    ),
    handleCardClick: PropTypes.func.isRequired,
    openCreatePost: PropTypes.func.isRequired,
};
