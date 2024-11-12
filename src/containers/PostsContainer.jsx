import {Box} from "@mui/material";
import PropTypes from "prop-types";
import Post from "../components/Post.jsx";

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
        <Box display="flex" flexWrap="wrap" gap={2}>
            {postList}
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
};
