import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/index';
import NotFound from './components/NotFound';
import AlbumFeatures from './features/Album/pages';
import CounterFeatures from './features/Counter';
import ProductFeature from './features/Product';
import TodoFeatures from './features/Todo/pages';

function App() {

  return (
    <div className="App">
      <Header />
      <Switch>
        <Redirect from='/home' to='/' exact />
        <Redirect from='/post-list/:postId' to='/posts/:postId' exact />

        <Route path="/" component={CounterFeatures} exact />
        <Route path="/todos-list" component={TodoFeatures} />
        <Route path="/albums" component={AlbumFeatures} />
        <Route path="/products" component={ProductFeature} />

        <Route component={NotFound} />
      </Switch>

    </div>
  );
}

export default App;
