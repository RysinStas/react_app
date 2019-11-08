import React from 'react';
import styled from "styled-components";

const Form = styled.form`
    padding: .25rem .75rem;   
`;
const Textarea = styled.textarea`
    overflow: auto;
    resize: vertical;
    width: 100%;   
    padding: .375rem .75rem;
    max-height: 20rem;
    min-height: 3rem;
    font-size: 1rem;
    line-height: 1.5;
    border: 1px solid #ced4da;
    border-radius: .25rem;    
`;
const ButtonWrapper = styled.div`
    padding: .75rem;
    text-align: center;
`;
const Button = styled.button`
    display: inline-block;
    padding: .375rem .75rem; 
    color: #6c757d;
    background-color: transparent; 
    border: 1px solid #6c757d;      
    border-radius: .25rem;
    text-transform: capitalize; 
    font-weight: 400;
    vertical-align: middle; 
    cursor: pointer;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    :hover {
        color: #ffffff;
        text-decoration: none;
        background-color: #6c757d;
        border-color: #6c757d;
    }    
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
                <Textarea
                    rows="5"
                    placeholder="Put your text here"
                    onChange={this.onTextChange}
                    value={this.state.content}>
                </Textarea>
                <ButtonWrapper>
                    <Button type="submit">add post</Button>
                </ButtonWrapper>
            </Form>
        );
    }
}

export default PostAddForm;