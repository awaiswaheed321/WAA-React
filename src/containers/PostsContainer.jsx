import {Box} from "@mui/material";
import Post from "../components/Post.jsx";
import {useEffect, useState} from "react";
import DataFetchingService from "../services/DataFetchingService.js";
import HeaderMenu from "../components/HeaderMenu.jsx";
import PostDetails from "../components/PostDetails.jsx";

const PostsContainer = () => {
    const [posts, setPosts] = useState([]);
    const [showPostDetail, setShowPostDetail] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

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
    }, []);

    const handlePostCardClick = async (postId) => {
        setSelectedPost(postId);
        setShowPostDetail(true);
    };

    const postList = posts.map((p) => (<Post
        key={p.id}
        id={p.id}
        title={p.title}
        author={p.author}
        handleCardClick={handlePostCardClick}
    />));

    return (<div>
        <HeaderMenu/>
        <Box sx={{marginTop: 2, marginBottom: 2}}>
            <Box display="flex" flexWrap="wrap" gap={2}>
                {postList}
            </Box>
        </Box>
        {showPostDetail && (<Box sx={{
            display: "flex", justifyContent: "center", alignItems: "center", width: "100%",
        }}
        >
            <PostDetails fetchPosts={fetchPosts} selectedPost={selectedPost} setSelectedPost={setSelectedPost} setShowPostDetail={setShowPostDetail} />
        </Box>)}
    </div>);
};

export default PostsContainer;