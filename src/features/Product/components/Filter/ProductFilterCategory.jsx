import React, { useEffect, useState } from 'react'
import { Typography, Box, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import categoryApi from '../../../../api/categoryApi';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
    },
    menu: {
        height: '40px',
            '&:hover': {
                color: 'red'
            }
    }
}));

const ProductFilterCategory = ({ onChange }) => {
    const classes = useStyles();
    const [categories, setCategories] = useState()

    useEffect(() => {
        (async () => {
            try {
                const list = await categoryApi.getAll()
                setCategories(list)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    const handleCategotyClick = (category) => {
        onChange(category.id)
    }

    return (
        <Box className={classes.root} >
            <List component="nav" aria-label="contacts">
                <Typography>DANH MỤC SẢN PHẨM</Typography>
                {categories?.map(category => (
                    <ListItem className={classes.menu} button key={category.id} onClick={() => handleCategotyClick(category)}>
                        <ListItemText primary={category.name} />
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default ProductFilterCategory
