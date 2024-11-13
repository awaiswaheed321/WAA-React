import {useState} from 'react';
import {Button, Paper, TextField} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import Typography from "@mui/material/Typography";
import DataFetchingService from "../services/DataFetchingService.js";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

export default function CreatePost(props) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async () => {
        try {
            if (title === '' || author === '' || content === '') {
                alert("Please enter all required fields.");
                return;
            }
            const post = {
                title: title,
                author: author,
                content: content,
            }
            await DataFetchingService.createPost(post);
            alert("Successfully added post");
            setTitle('');
            setAuthor('');
            setContent('');
            props.fetchPosts();
        } catch (error) {
            console.log(error);
        }
    };

    const handleReset = () => {
        setTitle('');
        setAuthor('');
        setContent('');
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '500px', margin: 'auto', position: 'relative' }}>
            <IconButton
                aria-label="close"
                onClick={props.closeCreatePost}
                sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "grey.500",
                }}
            >
                <CloseIcon />
            </IconButton>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" color="inherit" component="div" sx={{ fontWeight: 'bold' }}>
                    Create Post
                </Typography>
            </Box>
            <Grid2 container spacing={2} direction="column">
                <Grid2 item xs={12} container spacing={2}>
                    <Grid2 item xs={6}>
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Grid2>
                    <Grid2 item xs={6}>
                        <TextField
                            label="Author"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
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
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Grid2>
                <Grid2 item xs={12} display="flex" justifyContent="center">
                    <Button variant="contained" color="success" onClick={handleSubmit} sx={{ margin: 2 }}>
                        Submit
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleReset} sx={{ margin: 2 }}>
                        Reset
                    </Button>
                </Grid2>
            </Grid2>
        </Paper>
    );

}

CreatePost.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    closeCreatePost: PropTypes.func.isRequired,
};

