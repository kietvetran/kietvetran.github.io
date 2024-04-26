import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middlewares = [thunk];
if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require,@typescript-eslint/no-var-requires
    const { createLogger } = require('redux-logger');
    // eslint-disable-next-line
    const logger = createLogger();
    // middlewares.push(logger);
}

export default function configureStore() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const store = createStore(rootReducer as any, applyMiddleware(...middlewares));
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            store.replaceReducer(rootReducer as any);
        });
    }
    return store;
}
