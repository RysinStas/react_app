import React from "react";

import {connect}  from "react-redux"
const SecretPage = ({username}) => {
    if (username) {
        return (
            <div>
                <h3>This is secret page</h3>
            </div>
        );
    }
    return <p>You should not see this</p>
};

const mapStateToProps = ({username}) => {
    return {username}
};
export default connect(mapStateToProps)(SecretPage);