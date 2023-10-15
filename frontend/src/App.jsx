import {useNavigate,useRoutes} from 'react-router-dom'
import {Layout} from '@arco-design/web-react'
import router from './router/router';
import MainSider from './component/mainSider/mainSider';
import MainHeader from './component/mainHeader/mainHeader';
import { Suspense, useState } from 'react';
import MainSpin from './component/mainSpin/mainSpin';
import SecondMenu from './component/secondMenu/secondMenu';
import "./theme/theme.less"

function App() {
    const [theme,setTheme] = useState("theme-dark")
    const routers = useRoutes(router)
    const nav = useNavigate()
    const to = () =>{
        nav('/')
    }

    return (
        <div className={theme}>
            <Layout>
            <Layout.Sider collapsed={true} style={{height:'100vh'}}><MainSider /></Layout.Sider>
            <Layout >
                <Layout.Header className="move"><MainHeader /></Layout.Header>
                <Layout style={{marginTop:50}}>
                <Layout.Content >
                    <Suspense fallback={<MainSpin/>}>{routers}</Suspense>
                </Layout.Content>
                <Layout.Sider style={{width:"60px"}} className="second-menu"><SecondMenu /></Layout.Sider>
                </Layout>
            </Layout>
            </Layout>
        </div>
    )
}

export default App
