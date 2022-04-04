import React from 'react'
import { useState } from 'react'
import { Box, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        borderTop: `1px solid ${theme.palette.grey[500]}`
    },
    range: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',

        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),

        '& > span': {
            margin: '0 10px'
        }
    },
})) 

const FilterByPrice = ({ onChange }) => {
    const classes = useStyles()
    const [values, setValues] = useState({
        salePrice_gte: 0,
        salePrice_lte: 0
    })

    const handleChangePrice = (e) => {
        const { name, value } = e.target
        setValues(pre => ({
            ...pre,
            [name]: value
        }))
    }

    const handleSubmit = () => {
        if (onChange) onChange(values)
    }
    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">Chọn khoảng giá</Typography>
            <Box className={classes.range}>
                <TextField name="salePrice_gte" value={values.salePrice_gte} onChange={handleChangePrice} />
                <span>-</span>
                <TextField name="salePrice_lte" value={values.salePrice_lte} onChange={handleChangePrice} />
            </Box>
            <Button variant="outlined" color="primary" onClick={handleSubmit}>Áp Dụng</Button>
        </Box>
    )
}

export default FilterByPrice
