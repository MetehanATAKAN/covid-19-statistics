// index.js (rootSaga ve rootReducer'ı birleştirme)
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { watchFetchData } from './saga';
import reducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  app: reducer
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchFetchData);

export default store;
