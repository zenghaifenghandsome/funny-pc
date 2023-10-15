import { Avatar, Button, Card ,Image} from "@arco-design/web-react";
import { FC, useEffect, useState } from "react";
import { api_getUserInfo } from "../../tools/ajax";



const MainShare = props => {
    const [userinfo,setUserinfo] = useState()
    const getUserinfo = async () => {
        let result = await api_getUserInfo(props.userid)
        console.log(result)
        setUserinfo(result.data)
    }
    const parseHtmlFromStr = str => {
        //return document.getElementsByClassName('main-share-content-content').innerHTML=str
    }
    useEffect(()=>{
        getUserinfo()
        //parseHtmlFromStr(props.content || '')
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
                    <div className="main-share-content-content">
                    <div dangerouslySetInnerHTML={{ __html: props.content }} />
                    </div>
                    <div>{props.piclist?.map(pic => <Image width={130} style={{margin:'5px 5px 0px 0px'}} src={pic} key={pic}/>)}</div>
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