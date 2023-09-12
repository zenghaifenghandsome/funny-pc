import { useEffect, useState} from 'react';
import {Card} from "@arco-design/web-react";


import { Outlet, useNavigate } from 'react-router-dom';
const Home = () =>{
    const route = useNavigate();
    const [active,setActive] = useState<number>(1)
    useEffect(()=>{
        route("/share")
    },[])
    const onSelect = (index:number) =>{
        setActive(index);
    }
    return (
        <div className='home'>
            <Card style={{
                backgroundColor:'var(--w-card-bg)',
                padding:0,
                border:'1px solid var(--w-card-border)'}}></Card>
            <div className='home-content'>
                <div className='home-left'>
                    <div className='home-left-main' >首页</div>
                    <div 
                    className={'home-left-all-share'+ (active===1?' home-left-all-share-active':'')}
                    onClick={()=> onSelect(1)}
                    >全部分享</div>
                    <div 
                    className={'home-left-all-share' + (active===2?' home-left-all-share-active':'')}
                    onClick={()=> onSelect(2)}
                    >最新分享</div>
                    <div 
                    className={'home-left-all-share' + (active===3?' home-left-all-share-active':'')}
                    onClick={()=> onSelect(3)}
                    >全部关注</div>
                    <div 
                    className={'home-left-all-share' + (active===4?' home-left-all-share-active':'')}
                    onClick={()=> onSelect(4)}
                    >特别关注</div>
                    <div 
                    className={'home-left-all-share' + (active===5?' home-left-all-share-active':'')}
                    onClick={()=> onSelect(5)}
                    >好友圈</div>
                </div>
                <Outlet />
                <div className='home-right'>
                    <div>热搜</div>
                </div>
            </div>
        </div>
        
    )
    
}
export default Home;