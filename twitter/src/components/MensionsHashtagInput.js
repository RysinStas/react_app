import React from "react";
import debounce from "lodash/debounce";
import {Mentions} from "antd";

import 'antd/dist/antd.css';
import * as actions from '../store/twitter/twitter-actions';
import {connect} from "react-redux";


const {Option} = Mentions;

class MensionsHashtagInput extends React.Component {

    state = {
        search: '',
        loading: false,
        tags: [],
        users: [],
        prefix: '#'
    };

    onSearch = (search, prefix) => {
        this.setState({search, loading: true, tags: [], users: []});
        this.fetchData(search, prefix);
    };

    fetchData = debounce(async (key, prefix) => {
        try {
            let response = null;
            const {search} = this.state;
            switch (prefix) {
                case '#':
                    response = await this.props.fetchHashtags(key);
                    if (search !== key) return;
                    this.setState({
                        tags: response.payload.data,
                        loading: false,
                        prefix
                    });
                    break;
                case '@':
                    response = await this.props.fetchMentions(key);
                    if (search !== key) return;
                    this.setState({
                        users: response.payload.data,
                        loading: false,
                        prefix
                    });
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log('Something went wrong', error)
        }

    }, 800);

    render() {

        const {tags, users, loading, prefix} = this.state;
        return (
            <Mentions
                rows="2"
                placeholder="Put your text here"
                prefix={['@', '#']}
                autoFocus
                loading={loading}
                onSearch={this.onSearch}
                onKeyPress={this.props.onKeyPress}
            >
                {prefix === '#' ? tags.map(({name}) => (
                        <Option key={name} value={name} className="antd-demo-dynamic-option">
                            <span>{name}</span>
                        </Option>
                    )) :
                    users.map((name) => (
                        <Option key={name} value={name} className="antd-demo-dynamic-option">
                            <span>{name}</span>
                        </Option>
                    ))
                }
            </Mentions>
        )
    }
}

export default connect(null, actions)(MensionsHashtagInput)