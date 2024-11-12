import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import {PostDetails} from "./PostDetails";
import {PostsContainer} from "./PostsContainer";

const Dashboard = () => {
    const [posts, setPosts] = useState([{id: 1, title: "To Kill a Mockingbird", author: "Harper Lee"}, {
        id: 2, title: "1984", author: "George Orwell"
    }, {id: 3, title: "Pride and Prejudice", author: "Jane Austen"}, {
        id: 4, title: "The Great Gatsby", author: "F. Scott Fitzgerald"
    }, {id: 5, title: "Moby-Dick", author: "Herman Melville"}, {
        id: 6, title: "War and Peace", author: "Leo Tolstoy"
    }, {id: 7, title: "The Catcher in the Rye", author: "J.D. Salinger"}, {
        id: 8, title: "The Lord of the Rings", author: "J.R.R. Tolkien"
    }, {id: 9, title: "The Hobbit", author: "J.R.R. Tolkien"}, {
        id: 10, title: "Crime and Punishment", author: "Fyodor Dostoevsky"
    },]);
    const [showPostDetail, setShowPostDetail] = useState(false);
    const [postDetailContent, setPostDetailContent] = useState({});
    const [selectedPost, setSelectedPost] = useState(null);
    const [newName, setNewName] = useState("");

    const handleCardClick = (obj) => {
        setSelectedPost(obj.id);
        setPostDetailContent(obj);
        setShowPostDetail(true);
    };

    const handleCardClose = () => {
        setSelectedPost(null);
        setShowPostDetail(false);
        setPostDetailContent({});
    };

    const handleInputChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNameChangeClick = () => {
        if (selectedPost === null) {
            alert("Select a post first");
            return;
        }
        if (newName === null || newName === "") {
            alert("Input a new Name for post with ID: " + selectedPost);
            return;
        }
        const index = posts.findIndex((p) => p.id === selectedPost);
        const updatedPosts = [...posts];
        updatedPosts[index] = {...updatedPosts[index], title: newName};
        setPosts(updatedPosts);
        setPostDetailContent(updatedPosts[index]);
        setNewName("");
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

        <Box
            component="form"
            sx={{"& > :not(style)": {m: 1, width: "25ch"}}}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="outlined-basic"
                label="New Name"
                variant="outlined"
                value={newName}
                onChange={handleInputChange}
            />
            <Button
                variant="outlined"
                sx={{height: 56}}
                onClick={handleNameChangeClick}
            >
                Change name
            </Button>
        </Box>

        {showPostDetail && (<Box sx={{
            display: "flex", justifyContent: "center", alignItems: "center", width: "100%",
        }}
        > <PostDetails
            post={postDetailContent}
            handleCardClose={handleCardClose}
        />
        </Box>)}
    </Box>);
};

export default Dashboard;
