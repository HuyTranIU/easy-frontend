import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from '../../../components/NotFound';
import DetailPage from '../pages/DetailPage';
import ListPage from '../pages/ListPage';


function TodoFeatures(props) {
    const match = useRouteMatch()
    return (
        <div>
            Todo Share iu

            <Switch>
                <Route path={match.path} component={ListPage} exact />
                <Route path={`${match.path}/:todoId`} component={DetailPage} exact />

                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default TodoFeatures;