import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { PostDetails } from "./PostDetails";
import { PostsContainer } from "./PostsContainer";

const Dashboard = () => {
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [postDetailContent, setPostDetailContent] = useState({});

  const handleCardClick = (obj) => {
    setPostDetailContent(obj);
    setShowPostDetail(true);
  };

  const handleCardClose = () => {
    setShowPostDetail(false);
    setPostDetailContent({});
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ mb: 1.25 }}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            WAA - Lab 6
          </Typography>
        </Toolbar>
      </AppBar>
      <PostsContainer handleCardClick={handleCardClick} />
      {showPostDetail && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <PostDetails
            id={postDetailContent.id}
            title={postDetailContent.title}
            author={postDetailContent.author}
            handleCardClose={handleCardClose}
          />
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
