import React from 'react';
import './PostAddForm.css'
import styled from "styled-components";

const Form = styled.form`
    padding: .25rem .75rem;
`;
const PostAddButton = styled.div`
    padding: .75rem;
`;
const Button = styled.button`
    text-transform: capitalize;
`;

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
        if (this.state.content) {
            this.props.onAddPost(this.state.content);
            this.setState({
                content: ''
            });
        }
    };
    render() {
        return (
            <Form
                  onSubmit={this.onFormSubmit}>
                <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Put your text here"
                    onChange={this.onTextChange}
                    value={this.state.content}>
                </textarea>
                <PostAddButton className="text-center post-add-button">
                    <Button type="submit"
                            className="btn btn-outline-secondary ">add post
                    </Button>
                </PostAddButton>
            </Form>
        );
    }
}

export default PostAddForm;