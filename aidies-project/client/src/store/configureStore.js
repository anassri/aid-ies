import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import authentication from './authentication';
import campaign from './campaign';
import dashboard from './dashboard';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    authentication,
    campaign,
    dashboard,
    
});

const storeEnhancer = composeEnhancers(applyMiddleware(thunk));

const configureStore = (initialState) => {
    return createStore(
        reducer,
        initialState,
        storeEnhancer,
    );
};

export default configureStore;