import { useEffect, useState} from 'react';
import {Card, Input} from "@arco-design/web-react";


import { Outlet, useNavigate } from 'react-router-dom';
import { IconFire, IconHome } from '@arco-design/web-react/icon';
const Home = () =>{
    const route = useNavigate();
    const [headerIndex,setHeaderIndex] = useState(1)
    useEffect(()=>{
        route("/share/allshare")
    },[])
    
    return (
        <div className='home'>
            <Card style={{
                position:'fixed',
                top:50,
                width:'100%',
                zIndex:1,
                height:57,
                backgroundColor:'var(--w-card-bg)',
                padding:0,
                border:'1px solid var(--w-card-border)'}}
                bodyStyle={{display:'grid',gridTemplateColumns:'72px 72px 200px',justifyContent:'center'}}
                >
                    <IconHome  className='home-header-home-bnt' id={(headerIndex===1? 'header-bnt-active':'')} 
                        onClick={()=> {setHeaderIndex(1);route('/share/allshare')}}
                    />
                    <IconFire  className='home-header-home-bnt' id={(headerIndex===2? 'header-bnt-active':'')} 
                        onClick={()=> {setHeaderIndex(2);route('/hotshare')}}
                    />
                    <Input.Search placeholder='搜索分享'/>
                    
                </Card>
            <Outlet />
        </div>
        
    )
    
}
export default Home;