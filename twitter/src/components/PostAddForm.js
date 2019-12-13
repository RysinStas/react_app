import React from 'react';
import {Form, Button, Mentions} from 'antd';
import 'antd/dist/antd.css';
import * as actions from '../store/twitter/twitter-actions';
import {connect} from "react-redux";
// import Schema from 'async-validator';
import debounce from 'lodash/debounce';

// Schema.warning = function(){};

const { Option } = Mentions;

class PostAddForm extends React.Component {

    onPressEnter = (e) => {
        if (e.key ==='Enter') {
            if (e.ctrlKey || e.metaKey) {
                    const value = this.props.form.getFieldValue('content');
                    this.props.form.setFieldsValue({
                        content: value + '\n',
                    });
                } else {
                    this.onFormSubmit(e);
                }
        }

    };
    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.addPostAndFetchPosts(values.content, this.props.account.name);
                this.props.form.resetFields();
            }
        });
    };

    state = {
        search: '',
        loading: false,
        tags: [],
        users:[],
        prefix: '#'
    };

    onSearch = (search, prefix) => {
        this.setState({ search, loading: !!search, tags: [] });
        // console.log('prefix', prefix, 'Search:', search);
        this.fetchData(search, prefix);
    };

    fetchData = debounce( (key, prefix) => {
        if (!key) {
            this.setState({
                tags: [],
            });
            return;
        }
        switch (prefix) {
            case '#':
                this.props.fetchHashtags(key)
                    .then((response) => {
                        const { search } = this.state;
                        if (search !== key) return;

                        this.setState({
                            tags: response.payload.data,
                            loading: false,
                            prefix
                        });
                    });
                break;
            case '@':
                this.props.fetchMentions(key)
                    .then((response) => {
                        const { search } = this.state;
                        if (search !== key) return;

                        this.setState({
                            users: response.payload.data,
                            loading: false,
                            prefix
                        });
                    });

                // this.setState({
                //     users: [{name: 'admin'}, {name: 'psv'}],
                //     loading: false,
                //     prefix
                // });
                break;
            default:
                break;
        }

    } , 800);

    render() {
        const { getFieldDecorator } = this.props.form;
        const { tags, users, loading, prefix} = this.state;
        return (
            <Form
                onSubmit={this.onFormSubmit}>
                <Form.Item>
                    {getFieldDecorator('content', {
                        rules: [{required: true, message: 'Please input post content', whitespace: true, min: 1}],
                        initialValue: ''
                    })(
                        <Mentions
                            rows="5"
                            placeholder="Put your text here"
                            prefix={['@', '#']}
                            autoFocus
                            loading={loading}
                            onSearch={this.onSearch}
                            onKeyPress={this.onPressEnter}
                        >
                            {prefix==='#' ? tags.map(({ name }) => (
                                <Option key={name} value={name} className="antd-demo-dynamic-option">
                                    <span>{name}</span>
                                </Option>
                            )) :
                                users.map(( name  ) => (
                                    <Option key={name} value={name} className="antd-demo-dynamic-option">
                                        <span>{name}</span>
                                    </Option>
                                ))
                            }
                        </Mentions>,
                    )}
                </Form.Item>
                <Form.Item style={{textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit">Add Post</Button>
                </Form.Item>
            </Form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        current_page: state.feed.current_page,
        account: state.auth.account
    }
};

export default connect(mapStateToProps, actions)(Form.create({ name: 'coordinated' })(PostAddForm));
