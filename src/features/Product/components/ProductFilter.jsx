import React from 'react'
import { Box } from '@material-ui/core';
import ProductFilterCategory from './Filter/ProductFilterCategory';
import FilterByPrice from './Filter/FilterByPrice';
import FilterByService from './Filter/FilterByService';

const ProductFilter = ({ onhandleChange, filters }) => {
  const onhandleChangeCategory = (newCategoryId) => {
    const newFilter = {
      'category.id': newCategoryId
    }
    onhandleChange(newFilter)
  }

  const handleChange = (values) => {
    if (onhandleChange) onhandleChange(values)
  }
  return (
    <Box>
      <ProductFilterCategory onChange={onhandleChangeCategory} />
      <FilterByPrice onChange={handleChange} />
      <FilterByService filters={filters} onChange={handleChange} />
    </Box>
  )
}

export default ProductFilter
