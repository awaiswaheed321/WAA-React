import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {useCallback, useState} from "react";
import PostDetails from "../components/PostDetails.jsx";
import PostsContainer from "./PostsContainer.jsx";
import CreatePost from "../components/CreatePost.jsx";
import {StatesContext} from "../contexts/StatesContext.js";

const Dashboard = () => {
    const [updatePosts, setUpdatePosts] = useState(0);
    const incrementSetUpdatePosts = useCallback(() => {
        setUpdatePosts(i => i + 1);
    }, []);
    const [showPostDetail, setShowPostDetail] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showCreatePost, setShowCreatePost] = useState(false);

    return (<StatesContext.Provider value={{
        setShowPostDetail, selectedPost, setSelectedPost, setShowCreatePost, updatePosts, incrementSetUpdatePosts
    }}>
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{mb: 1.25}}>
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" component="div">
                        WAA - Lab 8-9
                    </Typography>
                </Toolbar>
            </AppBar>

            <PostsContainer/>

            {showPostDetail && (<Box sx={{
                display: "flex", justifyContent: "center", alignItems: "center", width: "100%",
            }}
            >
                <PostDetails/>
            </Box>)}

            {showCreatePost && (<Box sx={{
                display: "flex", justifyContent: "center", alignItems: "center", width: "100%",
            }}
            >
                <CreatePost/>
            </Box>)}
        </Box>
    </StatesContext.Provider>);
};

export default Dashboard;
