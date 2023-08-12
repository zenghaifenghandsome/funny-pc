import { useParams } from "react-router-dom"
import {useState,useEffect} from 'react';
import Md from '../../../../node_modules/md-editor-rt';
import { api_getThisBlog } from "../../../tools/ajax";
import 'md-editor-rt/lib/style.css';
import {Avatar, Button, Card} from '@arco-design/web-react'
import MainSpin from "../../../component/mainSpin/mainSpin";
import './blogshow.less';
import TimeAgo from "../../../component/timeAgo/timeAgo";

const BlogShow = () =>{
  const props = useParams();
  const [article,setArticle] = useState<any>(null)
  useEffect(()=>{
    api_getThisBlog(props.id).then((req:any)=>{
      console.log(req.data.data)
      setArticle(req.data.data)
    }).catch((err:any)=>{console.log(err)})
  },[])

  if(article===null){return <MainSpin />}
  return(
    <>
      <Card bodyStyle={{display:'flex',justifyContent:'center',backgroundColor:'#E5E6EB',padding:0}}>
        <div style={{width:"50%",minWidth:500,backgroundColor:'white'}}>
          <div>
            <div style={{fontSize:30,width:'100%',textAlign:'center',fontWeight:'bold',color:'black',marginTop:20}}>{article.blogtitle}</div>
            <div style={{display:'grid',gridTemplateColumns:'60px auto 100px',marginLeft:10}}>
              <div>
                <Avatar size={60}>
                  <img style={{width:60,height:60}} src={article.authoravator} />
                </Avatar>
              </div>
              <div style={{marginLeft:5,padding:'8px 0'}}>
                <div>{article.authorname}</div>
                <div style={{display:'flex'}}>
                  <TimeAgo creatTime={article.CreatedAt} />
                  <span style={{margin:'0 5px'}}>阅读</span>
                  <span>{article.blogreadnumb}</span>
                </div>
              </div>
              <div>
                <Button type="outline" style={{margin:'14px 0'}}>+关注</Button>
              </div>
            </div>
          </div>
          <div style={{margin:'0 10px'}}>{article.blogarticlepic.length===0?<></>:<img src={article.blogarticlepic} alt="pic" style={{width:'100%'}} />}</div>
          <Md modelValue={article.blogdetail} previewOnly className="md"/>
        </div>
        
      </Card>
    </>
  )
}
export default BlogShow;