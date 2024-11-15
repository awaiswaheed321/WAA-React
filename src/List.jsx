import {useEffect, useState} from 'react';
import PropTypes from "prop-types";

const List = ({getItems}) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getItems());
    }, [getItems]);

    return (<>
        {items.map((item) => (<div key={item}>{item}</div>))}
    </>);
};

List.propTypes = {
    getItems: PropTypes.func.isRequired,
}

export default List;
