import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import authentication from './authentication';
import campaign from './campaign';
import logger from 'redux-logger'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    authentication,
    campaign,
    
});

const storeEnhancer = composeEnhancers(applyMiddleware(thunk, logger));

const configureStore = (initialState) => {
    return createStore(
        reducer,
        initialState,
        storeEnhancer,
    );
};

export default configureStore;