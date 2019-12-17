import React from "react";
import {notification} from 'antd';
import {Redirect} from "react-router-dom";
import uuid from 'uuid/v4';

const Errors = ({errors}) => {
    return  errors.map((error) => {
        notification.error({
            message: 'Error',
            description: error.data.error,
            placement: "bottomRight"
        });
        if (error.status === 404) {
            return (<Redirect key={uuid()} to={"/page404"}/>)
        }
        return true
    })
};

export default Errors