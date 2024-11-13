import {Box} from "@mui/material";
import Post from "../components/Post.jsx";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useContext, useEffect, useState} from "react";
import DataFetchingService from "../services/DataFetchingService.js";
import {StatesContext} from "../contexts/StatesContext.js";

const PostsContainer = () => {
    const [posts, setPosts] = useState([]);
    const {
        setShowPostDetail, setSelectedPost, setShowCreatePost, updatePosts
    } = useContext(StatesContext);

    const fetchPosts = async () => {
        try {
            const posts = await DataFetchingService.getAllPosts();
            setPosts(posts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts().then();
    }, [updatePosts]);

    const handlePostCardClick = async (postId) => {
        try {
            setSelectedPost(postId);
            setShowCreatePost(false);
            setShowPostDetail(true);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const openCreatePost = () => {
        setShowPostDetail(false);
        setSelectedPost(null);
        setShowCreatePost(true);
    }

    const postList = posts.map((p) => (<Post
        key={p.id}
        id={p.id}
        title={p.title}
        author={p.author}
        handleCardClick={handlePostCardClick}
    />));

    return (<Box sx={{marginTop: 2, marginBottom: 2}}>
        <Box display="flex" flexWrap="wrap" gap={2} justifyContent="space-between" alignItems="center">
            <Typography variant="h5" color="inherit" component="div"
                        sx={{fontWeight: 'bold', marginBottom: 2, marginLeft: 2}}>
                Posts
            </Typography>
            <Button variant="outlined" onClick={openCreatePost} sx={{marginRight: 2}}>
                Create Post
            </Button>
        </Box>
        <Box display="flex" flexWrap="wrap" gap={2}>
            {postList}
        </Box>
    </Box>);
};

export default PostsContainer;