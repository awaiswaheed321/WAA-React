import {Divider, List, Paper} from '@mui/material';
import PropTypes from "prop-types";
import React from 'react';
import {Comment} from "../components/Comment.jsx";

export const CommentsContainer = (props) => {
    return (<Paper elevation={2} style={{marginBottom: 10}}>
        <List>
            {props.comments.map((comment, index) => (<React.Fragment key={comment.id}>
                <Comment id={comment.id} name={comment.name}/>
                {index < props.comments.length - 1 && <Divider variant="middle" component="li"/>}
            </React.Fragment>))}
        </List>
    </Paper>);
};

CommentsContainer.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired, name: PropTypes.string.isRequired,
    })).isRequired,
};
