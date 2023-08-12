import {Collapsible,Button,TextArea} from "@douyinfe/semi-ui"
import { IconMessage } from "@arco-design/web-react/icon";
import React, {useState } from "react";
import { useSelector } from "react-redux";
import { api_addReplyComment, api_getBcComment } from "../../tools/ajax";

interface replyComentEditorProps{
    bcID?:any,
    commentID?:string,
    reload?:any,
    replyReload?:any,
}

const ReplyCommentEditor:React.FC<replyComentEditorProps> = (props) =>{
    const {bcID,commentID,reload,replyReload} = props
    const [isReplyComment,setIsReplyComment] = useState<boolean>(false)
    const [isLoad,setIsLoad] = useState<boolean>(false)
    const [value,setValue] = useState<any>()
    const userInfo = useSelector((state:any)=> state.user.value)
    const inputValue = (value:string)=>{
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
        await api_addReplyComment(reply).then((req:any)=>{
            //console.log(req)
            setIsLoad(false)
            setIsReplyComment(false)
            reload()
            replyReload()
        }).catch((err:any)=>{console.log(err)})
        
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