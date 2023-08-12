import {Menu} from '@arco-design/web-react';
import {matchRoutes, useLocation, useNavigate} from 'react-router-dom';
import {IconBranch,IconHome,IconCode,IconMusic,IconBook,IconAlipayCircle,IconSelectAll,IconApps} from '@arco-design/web-react/icon'
import { useEffect, useState } from 'react';
import router from '../../router/router';
const MainSider = () =>{
    const [isInit,setIsInit] = useState<boolean>(false)
    const [selectKey,setSelectKey] = useState<string[]>([])
    const location = useLocation()
    const nav = useNavigate()
    const menuClick = (key:string) =>{
        nav(key)   
    }
    useEffect(()=>{
        const routes = matchRoutes(router,location.pathname)
        //console.log(routes)
        let pathArr:string[] = []
        if(routes !== null){
            for(let route of routes){
                let path = route.route.path
                if(path){
                    pathArr.push(path)
                }
            }
        }
        console.log(pathArr)
        setSelectKey(pathArr)
        setIsInit(true)
        
    },[location.pathname])
    if(!isInit){
        return null
    }
    return(
        <>
            <Menu className="main-sider"
            selectedKeys={selectKey} onClickMenuItem={menuClick} style={{height:'100%',position:'fixed',top:0,left:0,zIndex:10}}>
                <Menu.Item className="menuButton" key='/'>
                    <IconHome />home
                </Menu.Item>
                <Menu.Item className="menuButton" key='/bc'>
                    <IconCode />bc
                </Menu.Item>
                <Menu.Item className="menuButton" key='/music'>
                    <IconMusic />music
                </Menu.Item>
                <Menu.Item className="menuButton" key='/blog'>
                    <IconBook />blog
                </Menu.Item>
                <Menu.Item className="menuButton" key='/money'>
                    <IconAlipayCircle />记账
                </Menu.Item>
                <Menu.Item className="menuButton" key='/todo'>
                    <IconSelectAll />待办
                </Menu.Item>
                <Menu.Item className="menuButton" key='/admin'>
                    <IconApps />后台管理
                </Menu.Item>
                <Menu.Item className="menuButton" key='/evd'>
                    <IconBranch />每天
                </Menu.Item>
            </Menu>
        </>
    )
}
export default MainSider;