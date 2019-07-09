import rootReducer from './redux/index';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './redux/sagas';
import { connectRoutes } from 'redux-first-router';

export const POSTS = 'POSTS';
export const POST_FORM = 'POST_FORM';

const routesMap = {
    [POST_FORM]: '/',
    [POSTS]: '/posts'
}

const { reducer: location, middleware, enhancer } = connectRoutes(routesMap);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer({location}), 
    compose(
        enhancer,
        applyMiddleware(sagaMiddleware, middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

sagaMiddleware.run(rootSaga);

export default store;