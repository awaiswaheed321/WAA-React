import PropTypes from "prop-types";
import {ListItem, ListItemText} from "@mui/material";

export const Comment = (props) => {
    return (<ListItem
        alignItems="flex-start"
        sx={{
            paddingTop: 0.5,
            paddingBottom: 0.5,
            minHeight: '30px'
        }}
    >
        <ListItemText
            primary={`${props.id}: ${props.name}`}
            primaryTypographyProps={{variant: 'body2'}}
            sx={{margin: 0}}
        />
    </ListItem>);
}

Comment.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
}