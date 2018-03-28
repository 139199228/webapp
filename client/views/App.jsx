import React from 'react'
import Routes from '../config/router'
import { Link } from 'react-router-dom'
export default class App extends React.Component {
    componentDidMount(){

    }

    render(){//渲染组件
        return [
            <div key="banner">
                <Link to='/'>首页</Link>
                <Link to='/list' >清单</Link>
                <Link to='/detail'>详情页</Link>
            </div>,
            <Routes key="router" />
        ]
    }
}
