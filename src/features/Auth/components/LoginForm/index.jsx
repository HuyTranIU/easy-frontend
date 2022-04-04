import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Typography, Button, LinearProgress } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { makeStyles } from '@material-ui/core/styles';
import InputField from './../../../../components/form-controls/InputField/index';
import PasswordField from './../../../../components/form-controls/PasswordField/index';

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};

const useStyles = makeStyles((them) => ({
    root: {
        paddingTop: them.spacing(4)
    },
    avatar: {
        margin: 'auto',
        backgroundColor: them.palette.secondary.main
    },
    title: {
        margin: them.spacing(2, 0, 3, 2),
        textAlign: 'center'
    },
    submit: {
        marginTop: them.spacing(2),
    }
}))

function LoginForm(props) {
    const classes = useStyles()
    const schema = yup.object().shape({
       
        indentifier: yup.string()
            .required('Please enter your email')
            .email('Please enter a vaild email address')
            .trim(),

        password: yup.string().required('Please enter your password'),

       
    });

    const form = useForm({
        defaultValues: {
            indentifier: '',
            password: '',
        },
        resolver: yupResolver(schema)
    })
    const handleSubmit = async (values) => {
        const { onSubmit } = props
        if (onSubmit) await onSubmit(values)
    }

    const {isSubmitting} = form.formState

    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress />}
            <Avatar className={classes.avatar}>
                <LockOutlined></LockOutlined>
            </Avatar>
            <Typography className={classes.title} component="h3" variant="h5">
                Sign In
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="indentifier" label="Email" form={form} />
                <PasswordField name="password" label="Password" form={form} />
                <Button disabled={isSubmitting} type="submit" className={classes.submit} variant="contained" color="primary" fullWidth>
                    Sign In
                </Button>
            </form>
        </div>

    );
}

export default LoginForm;