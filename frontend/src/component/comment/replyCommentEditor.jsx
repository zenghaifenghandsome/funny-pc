import {Collapsible,Button,TextArea} from "@douyinfe/semi-ui"
import { IconMessage } from "@arco-design/web-react/icon";
import React, {useState } from "react";
import { useSelector } from "react-redux";
import { api_addReplyComment, api_getBcComment } from "../../tools/ajax";

const ReplyCommentEditor = (props) =>{
    const {bcID,commentID,reload,replyReload} = props
    const [isReplyComment,setIsReplyComment] = useState(false)
    const [isLoad,setIsLoad] = useState(false)
    const [value,setValue] = useArrayFieldState()
    const userInfo = useSelector((state)=> state.user.value)
    const inputValue = (value)=>{
        setValue(value)
    }
    const  onReply = async()=>{
        setIsLoad(true)
        
        let reply = {
            BcID:bcID,
            CommentID:commentID,
            Content:value,
            UserId:userInfo.userid,
            UserAvator:userInfo.avator,
            UserName:userInfo.username,
            LikeNumb:0,
            LowNumb:0,
        }
        console.log(reply)
        await api_addReplyComment(reply).then((req)=>{
            //console.log(req)
            setIsLoad(false)
            setIsReplyComment(false)
            reload()
            replyReload()
        }).catch((err)=>{console.log(err)})
        
    }
    const collapsed = (
        <div>
            <TextArea placeholder="input you reply"  autoFocus value={value} onChange={inputValue}/>
            <Button type="primary" style={{marginRight:5,marginTop:5}}>取消</Button>
            <Button type="primary" style={{marginTop:5}} onClick={onReply} loading={isLoad}>发布</Button>
        </div>
        
    )
    const onclick = ()=>{
        setIsReplyComment(!isReplyComment)
    }
    
    return(
        <>
            <span onClick={onclick}><IconMessage />reply</span>
            {isReplyComment?<Collapsible isOpen={true}>
                {collapsed}
            </Collapsible>:""}  
        </>
    )
}
export default ReplyCommentEditor;