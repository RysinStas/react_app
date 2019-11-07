import React from 'react';
import './PostItem.css'

class PostItem extends React.Component {

    deletePost = () => {

    };

    render() {
        const {content, onDelete} = this.props;
        return (
            <span >
            {content}
                <button type="button"
                        className="btn btn-outline-danger btn-sm float-right" onClick={onDelete}>
                <i className="fa fa-trash-o"/>
            </button>
        </span>
        );
    }

};

export default PostItem;