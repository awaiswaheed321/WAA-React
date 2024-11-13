import React, {useContext, useRef} from 'react';
import {Button, Paper, TextField} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import Typography from "@mui/material/Typography";
import DataFetchingService from "../services/DataFetchingService.js";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import {StatesContext} from "../contexts/StatesContext.js";

const CreatePost = () => {
    const titleRef = useRef("");
    const authorRef = useRef("");
    const contentRef = useRef("");

    const {incrementSetUpdatePosts, setShowCreatePost} = useContext(StatesContext);

    const handleSubmit = async () => {
        const title = titleRef.current.value;
        const author = authorRef.current.value;
        const content = contentRef.current.value;

        try {
            if (title === '' || author === '' || content === '') {
                alert("Please enter all required fields.");
                return;
            }
            const post = {
                title: title, author: author, content: content,
            };
            await DataFetchingService.createPost(post);
            alert("Successfully added post");

            titleRef.current.value = '';
            authorRef.current.value = '';
            contentRef.current.value = '';
            incrementSetUpdatePosts();
        } catch (error) {
            console.log(error);
        }
    };

    const closeCreatePost = () => {
        setShowCreatePost(false);
    }

    const handleReset = () => {
        titleRef.current.value = '';
        authorRef.current.value = '';
        contentRef.current.value = '';
    };

    return (<Paper elevation={3} style={{padding: '20px', maxWidth: '500px', margin: 'auto', position: 'relative'}}>
        <IconButton
            aria-label="close"
            onClick={closeCreatePost}
            sx={{
                position: "absolute", top: 8, right: 8, color: "grey.500",
            }}
        >
            <CloseIcon/>
        </IconButton>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5" color="inherit" component="div" sx={{fontWeight: 'bold'}}>
                Create Post
            </Typography>
        </Box>
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
            <Grid2 container spacing={2} direction="column" sx={{width: "100%", maxWidth: 600}}>
                <Grid2 item xs={12} container spacing={2}>
                    <Grid2 item xs={6}>
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            size="small"
                            inputRef={titleRef}
                        />
                    </Grid2>
                    <Grid2 item xs={6}>
                        <TextField
                            label="Author"
                            variant="outlined"
                            fullWidth
                            size="small"
                            inputRef={authorRef}
                        />
                    </Grid2>
                </Grid2>
                <Grid2 item xs={12}>
                    <TextField
                        label="Content"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        size="small"
                        inputRef={contentRef}
                    />
                </Grid2>
                <Grid2 item xs={12}>
                    <Box sx={{display: "flex", justifyContent: "center"}}>
                        <Button variant="contained" color="success" onClick={handleSubmit} sx={{margin: 2}}>
                            Submit
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleReset} sx={{margin: 2}}>
                            Reset
                        </Button>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    </Paper>);
}

export default React.memo(CreatePost);
