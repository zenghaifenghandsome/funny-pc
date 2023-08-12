import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './tools/redux/index'
import { HashRouter } from 'react-router-dom'
import '@arco-design/web-react/dist/css/arco.css';

const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <HashRouter>
                <App/>
            </HashRouter>
        </React.StrictMode>
    </Provider>
)
