import { Affix } from "@arco-design/web-react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ShareClassHome = () => {
    const [active,setActive] = useState<number>(1)
    const route = useNavigate();
    const onSelect = (index:number,path:string) =>{
        setActive(index)
        route(path)
        console.log(path)
    }
    return(
        <>
            <div className='home-content'>
                <Affix offsetTop={108}>
                    <div className='home-left'>
                        <div className='home-left-main' >首页</div>
                        <div 
                        className={'home-left-all-share'+ (active===1?' home-left-all-share-active':'')}
                        onClick={()=> onSelect(1,'/share/allshare')}
                        >全部分享</div>
                        <div 
                        className={'home-left-all-share' + (active===2?' home-left-all-share-active':'')}
                        onClick={()=> onSelect(2,'/share/latestshare')}
                        >最新分享</div>
                        <div 
                        className={'home-left-all-share' + (active===3?' home-left-all-share-active':'')}
                        onClick={()=> onSelect(3,'/share/allattention')}
                        >全部关注</div>
                        <div 
                        className={'home-left-all-share' + (active===4?' home-left-all-share-active':'')}
                        onClick={()=> onSelect(4,'/share/specialattention')}
                        >特别关注</div>
                        <div 
                        className={'home-left-all-share' + (active===5?' home-left-all-share-active':'')}
                        onClick={()=> onSelect(5,'/share/friends')}
                        >好友圈</div>
                    </div>
                </Affix>
                <Outlet />
                <Affix offsetTop={108}>
                    <div className='home-right'>
                        <div className='home-right-main'>热搜</div>
                        <div>aa</div>
                    </div>
                </Affix>
            </div>
        </>
    )
}
export default ShareClassHome;