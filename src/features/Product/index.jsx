import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListPage from './page/ListPage';
import { Box } from '@material-ui/core';

function ProductFeature(props) {
const math = useRouteMatch()

    return (
        <Box pt={3}>
            <Switch>
                <Route path={math.url} exact component={ListPage} />
            </Switch>
        </Box>
    );
}

export default ProductFeature;