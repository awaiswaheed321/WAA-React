import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const Post = (props) => {
  return (
    <Card
      sx={{ minWidth: 290 }}
      onClick={() => {
        props.handleCardClick(props);
      }}
    >
      <CardContent>
        <Typography variant="body2">ID: {props.id}</Typography>
        <Typography variant="body2">Title: {props.title}</Typography>
        <Typography variant="body2">Author: {props.author}</Typography>
      </CardContent>
    </Card>
  );
};

Post.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  handleCardClick: PropTypes.func.isRequired,
};

export default Post;
