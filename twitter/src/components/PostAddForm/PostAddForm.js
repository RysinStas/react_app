import React from 'react';
import './PostAddForm.css'

class PostAddForm extends React.Component {
    state = {
        content: ''
    };
    onTextChange = (e) => {
        this.setState({
            content: e.target.value
        });
    };
    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onAddPost(this.state.content);
        this.setState({
            content: ''
        });
    };
    render() {
        // const textareaId = uuid.v4();
        return (
            <form className="post-add-form"
                  onSubmit={this.onFormSubmit}>
                <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Put your text here"
                    onChange={this.onTextChange}
                    value={this.state.content}>
                </textarea>
                <div className="text-center post-add-button">
                    <button type="submit"
                            className="btn btn-outline-secondary ">add post
                    </button>
                </div>
            </form>
        );
    }
}

export default PostAddForm;