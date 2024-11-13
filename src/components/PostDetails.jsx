import CloseIcon from "@mui/icons-material/Close";
import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import {styled} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {CommentsContainer} from "../containers/CommentsContainer.jsx";
import React, {useContext, useEffect, useState} from "react";
import {StatesContext} from "../contexts/StatesContext.js";
import DataFetchingService from "../services/DataFetchingService.js";

const PostDetailsPaper = styled(Paper)(({theme}) => ({
    width: 300,
    height: "auto",
    padding: theme.spacing(2), ...theme.typography.body2,
    textAlign: "center",
    marginTop: 10,
}));

const PostDetails = () => {
    const {
        selectedPost, setShowPostDetail, setSelectedPost, incrementSetUpdatePosts
    } = useContext(StatesContext);

    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const post = await DataFetchingService.getPost(selectedPost);
                setPost(post);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPost().then();
    }, [selectedPost]);

    const handleDeletePost = async (id) => {
        try {
            await DataFetchingService.deletePost(id);
            alert("Successfully deleted");
            incrementSetUpdatePosts();
            setShowPostDetail(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCardClose = () => {
        setShowPostDetail(false);
        setSelectedPost(null);
    };

    return (<Stack direction="column" spacing={2} sx={{position: "relative"}}>
        {post && <PostDetailsPaper square={false}>
            <IconButton
                aria-label="close"
                onClick={handleCardClose}
                sx={{
                    position: "absolute", top: 8, right: 8, color: "grey.500",
                }}
            >
                <CloseIcon/>
            </IconButton>
            <Typography variant="h5" color="inherit" component="div" sx={{fontWeight: 'bold'}}>
                Post Details
            </Typography>
            <Box sx={{width: "100%", overflowWrap: "break-word"}}>
                <Typography variant="body2"><strong>ID:</strong> {post.id}</Typography>
                <Typography variant="body2"><strong>Title:</strong> {post.title}</Typography>
                <Typography variant="body2"><strong>Author:</strong> {post.author}</Typography>
                <Typography variant="body2"><strong>Content:</strong> {post.content}</Typography>
                <Typography variant="h6" sx={{fontWeight: 'bold'}}>Comments</Typography>
            </Box>

            {(post.comments !== null && post.comments.length > 0) ? <CommentsContainer comments={post.comments}/> :
                <Typography variant="body2" sx={{fontWeight: 'bold'}}>WOW, Such Empty</Typography>}
            <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
                <Button variant="outlined" color="error" onClick={() => handleDeletePost(post.id)}>
                    Delete Post
                </Button>
            </Box>
        </PostDetailsPaper>}
    </Stack>);
};

export default React.memo(PostDetails);