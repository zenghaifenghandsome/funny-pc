import { Card, Divider, Empty } from "@arco-design/web-react";
import { useEffect, useState } from "react"
import TimeAgo from "../../component/timeAgo/timeAgo";
import { api_getAllOkBlogs } from "../../tools/ajax";
import { Link } from "react-router-dom";
import './blog.less';
import { IconEye, IconMessage, IconThumbUp } from "@arco-design/web-react/icon";
const Blog = () =>{
    const [blogs,setBlogs] = useState<Array<any>>([]);
    const getblog = async () =>{
        let result:any = await api_getAllOkBlogs()
        setBlogs(result.data)
    }
    useEffect(()=>{
        getblog();
    },[])
    if(blogs.length===0){return <Empty />}
    return(
        <>
        <div className="blog-box">
            <div>{blogs.map((blog:any)=>(
                <Card key={blog.ID} bodyStyle={{display:"grid",gridTemplateColumns:'auto 120px'}} style={{width:800,margin:10}}>
                    <div>
                        <div style={{marginBottom:10,display:'flex'}}>
                            <span>{blog.authorname}</span>
                            <Divider type="vertical"/>
                            <span><TimeAgo creatTime={blog.CreatedAt}/></span>
                            <Divider type="vertical"/>
                            <span>{blog.blogtags}</span>
                        </div>
                        <Link to={`/blog/article/${blog.ID}`} style={{textDecorationLine: 'none',color:'gray'}}>
                            <div className="blog-title">{blog.blogtitle}</div>
                            <div style={{marginBottom:10}}>{blog.blogintroduce}</div>
                        </Link>
                        
                        <div style={{display:'flex'}}>
                            <div style={{marginRight:10}}><IconEye />{blog.blogreadnumb}</div>
                            <div style={{marginRight:10}}><IconThumbUp />{blog.bloglikenumb}</div>
                            <div style={{marginRight:10}}><IconMessage />{blog.blogcommentnumb}</div>
                        </div>
                    </div>
                    <div>
                        {blog.blogarticlepic.length===0?<></>:<img src={blog.blogarticlepic} style={{width:100,height:'auto'}} alt="tupian" />}
                    </div>
                </Card>
            ))}</div>
        </div>
        </>
    )
}
export default Blog;