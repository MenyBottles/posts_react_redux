import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers/index';
import PostsIndex from './components/posts_index';
import PostNew from './components/post_new';
import Post from './components/post';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStore(
    reducers, 
    {}, 
    composeWithDevTools(
        applyMiddleware(
            thunk
        )
    )
)

const App = () => {
    return(
        <Provider store={store}>
            <Router>
                <div>
                    <Route exact path="/" component={PostsIndex}/>
                    <Route exact path="/posts/:id" component={Post}/>
                    <Route path="/post/new" component={PostNew}/>
                </div>
            </Router>
        </Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
