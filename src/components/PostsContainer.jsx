import { Box } from "@mui/material";
import PropTypes from "prop-types";
import Post from "./Post";

const posts = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 2, title: "1984", author: "George Orwell" },
  { id: 3, title: "Pride and Prejudice", author: "Jane Austen" },
  { id: 4, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 5, title: "Moby-Dick", author: "Herman Melville" },
  { id: 6, title: "War and Peace", author: "Leo Tolstoy" },
  { id: 7, title: "The Catcher in the Rye", author: "J.D. Salinger" },
  { id: 8, title: "The Lord of the Rings", author: "J.R.R. Tolkien" },
  { id: 9, title: "The Hobbit", author: "J.R.R. Tolkien" },
  { id: 10, title: "Crime and Punishment", author: "Fyodor Dostoevsky" },
];

export const PostsContainer = (props) => {
  const postList = posts.map((p) => {
    return (
      <Post
        key={p.id}
        id={p.id}
        title={p.title}
        author={p.author}
        handleCardClick={props.handleCardClick}
      />
    );
  });

  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      {postList}
    </Box>
  );
};

PostsContainer.propTypes = {
  handleCardClick: PropTypes.func.isRequired,
};
