import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import generalReducer from "./store/reducers/generalReducer";
import personReducer from "./store/reducers/personReducer";

const rootReducer = combineReducers({
    generalReducer: generalReducer,
    personReducer: personReducer
});

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
