import { Button, Card, Comment, Empty, Modal,Input} from "@arco-design/web-react";
import { IconHeart, IconHeartFill,IconStarFill,IconStar} from "@arco-design/web-react/icon";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api_getBcComment,api_addReplyComment, api_addBcComment } from "../../tools/ajax";
import ReplyComment from "./replyComment";
import ReplyCommentEditor from "./replyCommentEditor";

interface commentProps{
    commentId?:string
}

const Comments:React.FC<commentProps> = (props:any) => {
    const {commentId} = props
    const [thisComment,setThisComment] = useState<any>(null)
    const [like, setLike] = useState<boolean>(false);
    const [star, setStar] = useState<boolean>(false);
    const [isreload, setisReload] = useState<boolean>(false);
    const [visible,setVisible] = useState<boolean>(false);
    const [textValue,setTextValue] = useState<any>()
    const userInfo = useSelector((state:any)=>state.user.value)

    const getComment = async (id:any) =>{
        let result:any = await api_getBcComment(id)
        setThisComment(result.data);
    }
    const addComment = async(comment:any) =>{
        let result:any = await api_addBcComment(comment);

    }
    useEffect(()=>{
        /**
         * @commentId: bcId编程导航id 
         */
        getComment(commentId);
    },[])
    const reload = () =>{
        console.log('reload 调用')
        setisReload(!isreload)
    }
    useEffect(()=>{
        getComment(commentId);
    },[isreload,visible])

    const inputText = (text:string) =>{
        console.log(text)
        setTextValue(text)
    }
    const release = () =>{
        setVisible(false)
        let comment = {
            BcID:commentId,
            Content:textValue,
            UserId:userInfo.userid,
            UserAvator:userInfo.avator,
            UserName:userInfo.username,
            LikeNumb:0,
            LowNumb:0,
        }
        addComment(comment);
        getComment(commentId);
    }
    return(
        <>
            <Card title="评论" style={{margin:'0 10px'}} extra={<Button type="primary" onClick={()=>setVisible(true)}>写评论</Button>}>
               {thisComment===null||thisComment.length===0? <Empty /> : thisComment.map((comment:any,index:any)=>(<Comment key={index}
               author={comment.UserName} 
               avatar={comment.UserAvator} 
               content={<div>{comment.Content}</div>} 
               actions={[
                <span className='custom-comment-action' key='heart' onClick={() => setLike(!like)}>
                    {like?(<IconHeartFill style={{ color: '#f53f3f' }}/>):(<IconHeart />)}{comment.LikeNumb+(like?1:0)}
                </span>,
                <span className='custom-comment-action' key='star' onClick={() => setStar(!star)}>
                    {star ? (
                        <IconStarFill style={{ color: '#ffb400' }}/>
                    ) : (
                        <IconStar />
                    )}
                    {comment.LowNumb + (star ? 1 : 0)}
                </span>,
                <span className='custom-comment-action' key='reply' ><ReplyCommentEditor bcID={commentId} commentID={comment.ID} replyReload={()=>{return}}  reload={reload}/></span>]}><ReplyComment bcid={commentId} reload={isreload} replyCommentID={comment.ID}/></Comment>))}
            </Card>
            <Modal visible={visible} onOk={release} title="写评论" okText="发布">
                   <Input.TextArea autoSize={true} value={textValue} onChange={inputText}/>
            </Modal>
        </>
    )
}
export default Comments;