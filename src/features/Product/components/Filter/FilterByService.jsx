import { Box, Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        borderTop: `1px solid ${theme.palette.grey[500]}`
    },
    list: {
        listStyle: 'none',
        margin: 0,
        padding: 0,

        '& > li': {
            marginTop: '10px'
        }
    },
}))

const FilterByService = ({ onChange, filters }) => {
    const classes = useStyles()

    const handleChange = (e) => {
        if (!onChange) return;
        const { name, checked } = e.target
        onChange({ [name]: checked })
    }

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">Dịch vụ</Typography>
            <ul className={classes.list}>
                {[
                    { value: 'isPromotion', label: 'Có Khuyến mãi' },
                    { value: 'isFreeShip', label: 'Miễn phí vận chuyển' }
                ].map((service) => (
                    <li key={service.value}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={Boolean(filters[service.value])}
                                    onChange={handleChange}
                                    name={service.value}
                                />
                            }
                            label={service.label}
                        />
                    </li>
                ))}
            </ul>
        </Box>
    )
}

export default FilterByService
