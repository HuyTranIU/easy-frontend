import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import productApi from '../../../api/productApi';
import ProductList from '../components/ProductList';
import ProductSkeleton from '../components/ProductSkeleton';
import Pagination from '@material-ui/lab/Pagination';
import ProductSort from './../components/ProductSort';
import ProductFilter from '../components/ProductFilter';
import FilterViewer from '../components/FilterViewer';

const useStyles = makeStyles(theme => ({
    root: {},

    left: {
        width: '260px',
        height: '90%',
        backgroundColor: theme.palette.background.paper,
    },

    right: {
        flex: '1 1 0',
    },

    pagination: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        paddingBottom: '40px'
    }
}))

function ListPage(props) {
    const classes = useStyles()
    const [productList, setProductList] = useState([])
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({
        limit: 12,
        total: 10,
        page: 1,
    })
    const [filters, setFilters] = useState({
        _page: 1,
        _limit: 12,
        _sort: 'salePrice:ASC'
    })

    useEffect(() => {
        (async () => {
            try {
                const { data, pagination } = await productApi.getAll(filters)
                setProductList(data)
                setPagination(pagination)
            } catch (error) {
                console.log('Failed to get product list', error);
            }

            setLoading(false)
        })()
    }, [filters])
    const handlePageChange = (e, page) => {
        setFilters(prevFilter => ({
            ...prevFilter,
            _page: page
        }))
    }
    const handleSortChange = (newSortValue) => {
        setFilters(prevFilter => ({
            ...prevFilter,
            _sort: newSortValue
        }))
    }
    const handleChangeCategory = (newFilter) => {
        setFilters(prevFilter => ({
            ...prevFilter,
            ...newFilter
        }))
    }

    const setNewFilter = (newFilter) => {
        setFilters(newFilter)
    }
    return (
        <Box>
            <Container>
                <Grid container spacing={3}>
                    <Grid item className={classes.left}>
                        <ProductFilter filters={filters} onhandleChange={handleChangeCategory} />
                    </Grid>

                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            <ProductSort currentSort={filters._sort} onChange={handleSortChange} />
                            <FilterViewer filters={filters} onChange={setNewFilter} />
                            {loading ? <ProductSkeleton length={10} /> : <ProductList data={productList} />}
                            <Box>
                                <Pagination
                                    className={classes.pagination}
                                    count={Math.ceil(pagination.total / pagination.limit)}
                                    color="primary"
                                    onChange={handlePageChange}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;