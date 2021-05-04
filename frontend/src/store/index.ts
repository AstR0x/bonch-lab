import { configureStore as confStore, EnhancedStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { config } from '@common/config';
import rootReducer from './root-reducer';
import { rootSaga } from './root-saga';

const configureStore = (preloadedState: unknown = {}): EnhancedStore => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  const store = confStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
    middleware,
  });

  // Включаем redux-saga middleware
  sagaMiddleware.run(rootSaga);

  if (config.environment !== 'production' && module.hot) {
    module.hot.accept('./root-reducer', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

export default configureStore;
export { history } from './root-reducer';
export type RootState = ReturnType<typeof rootReducer>;
