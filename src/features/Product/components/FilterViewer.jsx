import React, { useMemo } from 'react'
import { Box, Chip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        listStyle: 'none',
        margin: theme.spacing(2, 0),

        '& > li': {
            padding: theme.spacing(1),
            margin: 0
        }
    }

}))

const FILTER_LIST = [
    {
        id: 1,
        getLabel: () => 'Giao hàng miễn phí',
        isActive: (filters) => filters.isFreeShip,
        isVisible: () => true,
        isRemovable: false,
        onRemove: () => { },
        onToggle: (filters) => {
            const newFilter = { ...filters }
            if (newFilter.isFreeShip) {
                delete newFilter.isFreeShip
            } else {
                newFilter.isFreeShip = true
            }
            return newFilter
        },
    },
    {
        id: 2,
        getLabel: () => 'Có khuyến mãi',
        isActive: () => true,
        isVisible: (filters) => filters.isPromotion,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilter = { ...filters }
            delete newFilter.isPromotion
            return newFilter
        },
        onToggle: null,
    },
    {
        id: 3,
        getLabel: (filters) => `Từ ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
        isActive: () => true,
        isVisible: (filters) => Object.keys(filters).includes('salePrice_lte') && Object.keys(filters).includes('salePrice_gte'),
        isRemovable: true,
        onRemove: (filters) => {
            const newFilter = { ...filters }
            delete newFilter.salePrice_lte
            delete newFilter.salePrice_gte
            return newFilter
        },
        onToggle: null,
    },

]

const FilterViewer = ({ filters = {}, onChange }) => {

    const visibleFilter = useMemo(() => {
        return FILTER_LIST.filter(list => list.isVisible(filters))
    }, [filters])

    const classes = useStyles()
    return (
        <Box component='ul' className={classes.root}>
            {visibleFilter.map(x => (
                <li key={x.id}>
                    <Chip
                        size='small'
                        label={x.getLabel(filters)}
                        color={x.isActive(filters) ? 'primary' : 'default'}
                        clickable={!x.isRemovable}
                        onDelete={x.isRemovable ? () => {
                            if (!onChange) return;
                            const newFilter = x.onRemove(filters)
                            onChange(newFilter)
                        } : null}
                        onClick={x.isRemovable ? null : () => {
                            if (!onChange) return;
                            const newFilter = x.onToggle(filters)
                            onChange(newFilter)
                        }}
                    />
                </li>
            ))}
        </Box>
    )
}

export default FilterViewer
