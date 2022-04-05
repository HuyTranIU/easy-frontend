import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import productApi from '../../../api/productApi';
import ProductList from '../components/ProductList';
import ProductSkeleton from '../components/ProductSkeleton';
import Pagination from '@material-ui/lab/Pagination';
import ProductSort from './../components/ProductSort';
import ProductFilter from '../components/ProductFilter';
import FilterViewer from '../components/FilterViewer';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

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
    const history = useHistory()
    const location = useLocation()
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search)
        return {
            ...params,
            _page: Number.parseInt(params._page) || 1,
            _limit: Number.parseInt(params._limit) || 12,
            _sort: params._sort || 'salePrice:ASC',
            isPromotion: params.isPromotion === 'true',
            isFreeShip: params.isFreeShip === 'true',
        }
    }, [location.search])

    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({
        limit: 12,
        total: 10,
        page: 1,
    })
    // const [filters, setFilters] = useState(() => ({
    //     ...queryParams,
    //     _page: Number.parseInt(queryParams._page) || 1,
    //     _limit: Number.parseInt(queryParams._limit) || 12,
    //     _sort: queryParams._sort || 'salePrice:ASC'
    // }))

    // useEffect(() => {
    //     history.push({
    //         pathname: history.location.pathname,
    //         search: queryString.stringify(filters)
    //     })
    // }, [history, filters])

    useEffect(() => {
        (async () => {
            try {
                const { data, pagination } = await productApi.getAll(queryParams)
                setProductList(data)
                setPagination(pagination)
            } catch (error) {
                console.log('Failed to get product list', error);
            }

            setLoading(false)
        })()
    }, [queryParams])

    const handlePageChange = (e, page) => {
        // setFilters(prevFilter => ({
        //     ...prevFilter,
        //     _page: page
        // }))
        const filters ={
            ...queryParams,
            _page: page
        } 
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters)
        })
    }
    const handleSortChange = (newSortValue) => {
        // setFilters(prevFilter => ({
        //     ...prevFilter,
        //     _sort: newSortValue
        // }))
        const filters ={
            ...queryParams,
            _sort: newSortValue
        } 
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters)
        })
    }
    const handleChangeCategory = (newFilter) => {
        // setFilters(prevFilter => ({
        //     ...prevFilter,
        //     ...newFilter
        // }))
        const filters ={
            ...queryParams,
            ...newFilter
        } 
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters)
        })
    }

    const setNewFilter = (newFilter) => {
        // setFilters(newFilter)
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(newFilter)
        })
    }
    return (
        <Box>
            <Container>
                <Grid container spacing={3}>
                    <Grid item className={classes.left}>
                        <ProductFilter filters={queryParams} onhandleChange={handleChangeCategory} />
                    </Grid>

                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
                            <FilterViewer filters={queryParams} onChange={setNewFilter} />
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