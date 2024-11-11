import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 300,
  height: 100,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
  marginTop: 10,
}));

export const PostDetails = (props) => {
  return (
    <Stack direction="row" spacing={2} sx={{ mt: 2, position: "relative" }}>
      <DemoPaper square={false}>
        <IconButton
          aria-label="close"
          onClick={props.handleCardClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "grey.500",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" color="inherit" component="div">
          Post Details
        </Typography>
        <Typography variant="body2">ID: {props.id}</Typography>
        <Typography variant="body2">Title: {props.title}</Typography>
        <Typography variant="body2">Author: {props.author}</Typography>
      </DemoPaper>
    </Stack>
  );
};

PostDetails.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  handleCardClose: PropTypes.func.isRequired,
};
