import React from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const ProductSort = ({ currentSort, onChange }) => {
    const handleSortChange = (e, newSort) => {
        onChange(newSort)
    }
    return (
        <Tabs
            value={currentSort}
            onChange={handleSortChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="disabled tabs example"
        >
            <Tab label="Giá Thấp đến cao" value="salePrice:ASC" />
            <Tab label="Giá Cao đến thấp" value="salePrice:DESC" />
        </Tabs>
    )
}

export default ProductSort
