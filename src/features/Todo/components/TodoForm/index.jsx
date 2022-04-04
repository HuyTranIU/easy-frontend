import PropTypes from 'prop-types';
import React from 'react';
import InputField from '../../../../components/form-controls/InputField'
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

function TodoForm(props) {
    const schema = yup.object().shape({
        title: yup.string().required('Mời nhập Title')
            .min(5, 'Title quá ngắn'),
    }).required();

    const form = useForm({
        defaultValues: {
            title: '',
        },
        resolver: yupResolver(schema)
    })
    const handleSubmit = (values) => {
        const { onSubmit } = props
        if(onSubmit) onSubmit(values)
        form.reset()
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField name="title" form={form} label="Todo" />
        </form>
    );
}

export default TodoForm;