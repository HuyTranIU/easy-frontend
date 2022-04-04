import React from 'react';
import RegisterForm from '../RegisterForm';
import { register } from './../../userSlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit'
import { useSnackbar } from 'notistack';
import { PropTypes } from 'prop-types';

Register.protoTypes = {
    closeDialog: PropTypes.func,
}

function Register(props) {
    const { closeDialog } = props;

    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()


    const handleSubmit = async (values) => {
        try {
            values.username = values.email
            const action = register(values)

            const resultAction = await dispatch(action)
            unwrapResult(resultAction)

            enqueueSnackbar('Đăng ký thành công', { variant: 'success' })
            closeDialog()
        } catch (error) {
            console.log("Failed to register", error);
            enqueueSnackbar(error.message, { variant: 'error' })

        }
    }
    return (
        <>
            <RegisterForm onSubmit={handleSubmit} />
        </>
    );
}

export default Register;