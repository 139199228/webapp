import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader' // eslint-disable-line
import App from './App.jsx'
// ReactDOM.hydrate(<App></App>,document.getElementById('root'));
const root = document.getElementById('root')
const render = (Component) => {//动态渲染模板
    ReactDOM.hydrate(
        <AppContainer>
        <Component />
    </AppContainer>,
    root
    )
}
render(App)
if(module.hot){//热启动
    module.hot.accept('./App.jsx',() => {//热启动
        const nextApp = require('./App.jsx').default
        render(nextApp)
    });
}
