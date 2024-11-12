import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {PostDetails} from "../components/PostDetails.jsx";
import {PostsContainer} from "./PostsContainer.jsx";
import DataFetchingService from "../services/DataFetchingService.js";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [showPostDetail, setShowPostDetail] = useState(false);
    const [postDetailContent, setPostDetailContent] = useState({});

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

    const handleDeletePost = async (id) => {
        try {
            await DataFetchingService.deletePost(id);
            alert("Successfully deleted");
            fetchPosts().then();
            setShowPostDetail(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCardClick = async (postId) => {
        try {
            const post = await DataFetchingService.getPost(postId);
            setPostDetailContent(post);
            setShowPostDetail(true);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const handleCardClose = () => {
        setShowPostDetail(false);
        setPostDetailContent({});
    };

    return (<Box sx={{flexGrow: 1}}>
        <AppBar position="static" sx={{mb: 1.25}}>
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                    WAA - Lab 6
                </Typography>
            </Toolbar>
        </AppBar>

        <PostsContainer posts={posts} handleCardClick={handleCardClick}/>

        {showPostDetail && (<Box sx={{
            display: "flex", justifyContent: "center", alignItems: "center", width: "100%",
        }}
        > <PostDetails
            post={postDetailContent}
            handleCardClose={handleCardClose}
            handleDeletePost={handleDeletePost}
        />
        </Box>)}
    </Box>);
};

export default Dashboard;
