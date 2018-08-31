import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import reducers from './reducers/index';
import PostsIndex from './components/posts_index';
import PostNew from './components/post_new';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const App = () => {
    return(
        <Provider store={createStoreWithMiddleware(reducers)}>
            <Router>
                <div>
                    <Route exact path="/" component={PostsIndex}/>
                    <Route path="/post/new" component={PostNew}/>
                </div>
            </Router>
        </Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
