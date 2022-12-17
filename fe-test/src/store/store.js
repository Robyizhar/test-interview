import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import dataReducer from '../reduce/reducer';

import thunk from 'redux-thunk';

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const rootReducers = combineReducers({
    datas: dataReducer, 
});

const store = createStore(rootReducers, composerEnhancer(applyMiddleware(thunk)));

export default store
