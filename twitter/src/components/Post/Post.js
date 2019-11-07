import React from 'react';
import moment from "moment";
import './Post.css';

class Post extends React.Component {
    render() {
        const {content, user, createDate, onDelete} = this.props;
        return (
            <article>
                <div className="post-wrapper">
                    <div className="post-content">
                        <span>{content}</span>
                    </div>
                    <div className="post-info">
                        <div className="post-info-user">create by {user}</div>
                        <div className="post-info-date">{ moment(createDate).format('LLL')}</div>
                    </div>
                </div>
                <div className="post-buttons ">
                    <button type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={onDelete}>
                        <i className="fa fa-trash-o"/>
                    </button>
                </div>

            </article>
        );
    }
}

export default Post;