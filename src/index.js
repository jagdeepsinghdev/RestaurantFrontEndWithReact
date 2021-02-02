import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import 'semantic-ui-css/semantic.min.css'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reducer from './Containers/Store/Reducer/Reducer'

const store = createStore(Reducer)
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,

    document.getElementById('root')
)
