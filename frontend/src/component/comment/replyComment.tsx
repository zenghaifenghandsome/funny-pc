import { useEffect, useState } from "react";
import { api_getReplyComments } from "../../tools/ajax";
import {Comment,Button} from "@arco-design/web-react";
import { IconHeart, IconHeartFill} from "@arco-design/web-react/icon";
import ReplyCommentEditor from "./replyCommentEditor";
interface replyCommentProps{
    bcid?:string,
    replyCommentID?:string,
    reload?:boolean,
}

const ReplyComment:React.FC<replyCommentProps> = (props:any) =>{
    const {replyCommentID,reload,bcid} = props
    const [replyComments,setReplyComments] = useState<any>(null)
    const [like, setLike] = useState<boolean>(false);
    const [isReplyReload,setIsReplyReload] = useState<boolean>(false);
    const [isMore,setIsMore] = useState<boolean>(false);
    const [isShowMore,setIsShowMore] = useState<boolean>(false);
    useEffect(()=>{
        api_getReplyComments(replyCommentID).then((req:any)=>{
            if(req.data.data.length<=3){
                setReplyComments(req.data.data) 
            }else if(req.data.data.length>3 && !isMore){
                setReplyComments(req.data.data.slice(0,3))
                setIsShowMore(true) 
            }else{
                setReplyComments(req.data.data)
                setIsShowMore(false) 
            }
        }).catch((err:any)=>{console.log(err)})
    },[reload,isReplyReload,isMore])

    const replyReload = ()=>{
        console.log('replyReload 调用')
        setIsReplyReload(!isReplyReload)
    }
    const showMore = () =>{
        setIsMore(true)
    }
    if(replyComments===null || replyComments.length===0){
        return null
    }
    return(
        <>
            <div style={{backgroundColor:'#F7F8FA',padding:5}}>
                {replyComments.map((reply:any)=>(
                    <div key={reply.ID}>
                        <Comment key={reply.ID} author={reply.UserName} avatar={reply.UserAvator} content={<div>{reply.Content}</div>} 
                            actions={[<span className='custom-comment-action' key='heart' onClick={() => setLike(!like)}>
                            {like?(<IconHeartFill style={{ color: '#f53f3f' }}/>):(<IconHeart />)}{reply.LikeNumb+(like?1:0)}
                            </span>,
                            <span className='custom-comment-action' key='reply' ><ReplyCommentEditor bcID={bcid} commentID={replyCommentID} reload={()=>{return}} replyReload={replyReload}/></span>    
                        ]}
                        />
                    </div> 
                ))}
                {
                    isShowMore?<Button type="text" style={{marginTop:10,marginLeft:10}} onClick={showMore}>查看更多</Button>:null
                }
            </div>
        </>
    )
}
export default ReplyComment;