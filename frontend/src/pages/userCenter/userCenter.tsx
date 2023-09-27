import { Affix, Avatar, Button, Card, Empty } from "@arco-design/web-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { api_getUserInfo } from "../../tools/ajax";

const UserCenter = () =>{
    const userinfo = useSelector((state:any)=> state.user.value)
    const [active,setActive] = useState<number>(1)
    const [info,setInfo]= useState<any>(null);
    const getUserInfo = async (id:number) =>{
        let result:any = await api_getUserInfo(id)
       // console.log(result)
        setInfo(result.data)
    }
    const  route = useNavigate()
    const toEditUseInfo = () =>{
        route("/editUserInfo")
    }
    useEffect(()=>{
        if(userinfo===null || userinfo===undefined){
            route("/login")
        }else{
            route('/userCenter/ownerPage')
           getUserInfo(userinfo.userid)
           //console.log(info)
        }
    },[])

    const onSelect = (index:number,path:string) =>{
        setActive(index)
        route(path)
        console.log(path)
    }
    
    return(
        <>
            <div className="user-center">
                <Affix offsetTop={51}>
                    <div className="user-center-left">
                        <h2>个人主页</h2>
                        <div className={'user-center-left-select'+ (active===1?' user-center-left-active':'')}
                            onClick={()=> onSelect(1,'/usercenter/ownerpage')}
                        >
                            我的主页
                        </div>
                        <div className={'user-center-left-select'+ (active===2?' user-center-left-active':'')}
                             onClick={()=> onSelect(2,'/usercenter/ownerattention')}
                        >
                            我的关注
                        </div>
                        <div className={'user-center-left-select'+ (active===3?' user-center-left-active':'')}
                             onClick={()=> onSelect(3,'/usercenter/ownerfans')}
                        >
                            我的粉丝
                        </div>
                        <div className={'user-center-left-select'+ (active===4?' user-center-left-active':'')}
                             onClick={()=> onSelect(4,'/usercenter/ownerfavorite')}
                        >我的收藏</div>
                        <div className={'user-center-left-select'+ (active===5?' user-center-left-active':'')}
                             onClick={()=> onSelect(5,'/usercenter/ownerpraise')}
                        >我的赞</div>
                        <div className={'user-center-left-select'+ (active===6?' user-center-left-active':'')}
                             onClick={()=> onSelect(1,'/usercenter/ownerframercneter')}
                        >创作者中心</div>
                    </div>
                </Affix>
                <div className="user-center-content">
                    <Affix offsetTop={51}>
                        <div className="user-center-content-cancel" onClick={()=> route('/')}>{'<'+ '返回'}</div>
                    </Affix>
                    <div>
                        <img className="user-center-bk" src="https://ww1.sinaimg.cn/mw2000/70ace9b7ly1ggzusnypoej20yi0yiaop.jpg"/>
                    </div>
                    <div className="user-center-content-header">
                        <div className="user-center-content-avator">
                            <img alt="头像" src={userinfo.avator}  className="user-center-content-avator-img"/>
                        </div>
                        <div className="user-center-content-header-center">
                            <div className="user-center-content-username">{info?.nickname !='' ? info?.nickname:info?.username}</div>
                            <div className="user-center-content-user-tag">粉丝 4  关注 100</div>
                        </div>
                        <div>
                            <Button type="outline" onClick={toEditUseInfo}>编辑个人资料</Button>
                        </div>
                    </div>
                    <div className="user-center-content-desc">暂无简介</div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default UserCenter;