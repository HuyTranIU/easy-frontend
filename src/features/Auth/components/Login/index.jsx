import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { PropTypes } from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from './../../userSlice';
import LoginForm from './../LoginForm/index';

Login.protoTypes = {
    closeDialog: PropTypes.func,
}

function Login(props) {
    const { closeDialog } = props;

    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()


    const handleSubmit = async (values) => {
        try {
            const action = login(values)

            const resultAction = await dispatch(action)
            unwrapResult(resultAction)

            closeDialog()
        } catch (error) {
            console.log("Failed to login", error);
            enqueueSnackbar(error.message, { variant: 'error' })

        }
    }
    return (
        <div>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Login;