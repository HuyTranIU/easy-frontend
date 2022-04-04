import React from 'react'
import { Box, Chip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        listStyle: 'none',
        margin: theme.spacing(2,0),
    
        '& > li': {
            padding: theme.spacing(1),
            margin: 0
        }
    }
    
}))

const FILTER_LIST = [
    {
        id: 1,
        getLabel: (filters) => 'Giao hàng miễn phí',
        isActive: (filters) => filters.isFreeShip,
        isVisible: () => true,
        isRemovable: true,
        onRemove: (filters) => { },
        onToggle: (filters) => { },
    },
    {
        id: 2,
        getLabel: (filters) => 'Có khuyến mãi',
        isActive: (filters) => true,
        isVisible: (filters) => true,
        isRemovable: true,
        onRemove: (filters) => { },
        onToggle: (filters) => { },
    },
    {
        id: 3,
        getLabel: (filters) => 'Khoảng giá',
        isActive: (filters) => true,
        isVisible: (filters) => true,
        isRemovable: true,
        onRemove: (filters) => { },
        onToggle: (filters) => { },
    },
]

const FilterViewer = ({ filters = {}, onChange }) => {
    const classes = useStyles()
    return (
        <Box component='ul' className={classes.root}>
            {FILTER_LIST.filter(list => list.isVisible(filters)).map(x => (
                <li key={x.id}>
                    <Chip
                        label={x.getLabel(filters)}
                        color={x.isActive(filters) ? 'primary' : 'default'}
                        clickable={x.isRemovable ? null : ()=> {}}
                        onDelete={x.isRemovable ? () => {} : null}
                    />
                </li>
            ))}
        </Box>
    )
}

export default FilterViewer
