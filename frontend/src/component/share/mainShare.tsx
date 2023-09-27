import { Avatar, Button, Card ,Image} from "@arco-design/web-react";
import { FC, useEffect, useState } from "react";
import { api_getUserInfo } from "../../tools/ajax";

interface mainShareProps {
    id?:number,
    userid:number,
    content?:string,
    piclist?:Array<string>
}
const MainShare:FC<mainShareProps> = (props:mainShareProps) => {
    const [userinfo,setUserinfo] = useState<any>()
    const getUserinfo = async () => {
        let result:any = await api_getUserInfo(props.userid)
        console.log(result)
        setUserinfo(result.data)
    }
    useEffect(()=>{
        getUserinfo()
        //console.log(props.piclist)
    },[])
    return(
        <>
            <Card 
            style={{backgroundColor:'var(--w-card-bg)',border:'1px solid var(--w-card-border)',marginTop:10}}
            >
                <div className="main-share-header">
                    <Avatar size={64}>
                        <img src={userinfo?.avater}/>
                    </Avatar>
                    <div style={{padding:'0 8px'}}>
                        <div className="main-share-header-nickname" style={{fontSize:15,fontWeight:'bolder'}}>{userinfo?.nickname === "" ? userinfo?.username:userinfo?.nickname }</div>
                        <div className="main-share-header-info">info</div>
                    </div>
                    <Button shape="round" status='warning' type='primary'>+关注</Button>
                </div>
                <div className="main-share-content">
                    <div className="main-share-content-content">{props.content}</div>
                    <div>{props.piclist?.map((pic:any) => <Image width={130} style={{margin:'5px 5px 0px 0px'}} src={pic} key={pic}/>)}</div>
                </div>
                
                <div className="main-share-footer">
                    <div>转发</div>
                    <div>评论</div>
                    <div>点赞</div>
                </div>
            </Card>
        </>
    )
}
export default MainShare;