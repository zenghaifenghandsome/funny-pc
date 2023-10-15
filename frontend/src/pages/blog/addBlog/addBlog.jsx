import { Button, Card, Input } from "@arco-design/web-react";
import {MdEditor} from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import './addBlog.less';
import { useEffect, useState } from "react";
import { api_addBlog } from "../../../tools/ajax";

const AddBlog = () =>{
    const [blogVal,setBlogVal] = useState()
    const [blogHeight,setBlogHeight]= useState()
    useEffect(()=>{
        let height = document.getElementById('blogTitle')?.offsetHeight
        let windowHeight = document.body.clientHeight
        setBlogHeight(windowHeight-height-85)
        window.addEventListener('resize',()=>{
            let height = document.getElementById('blogTitle')?.offsetHeight
            let windowHeight = document.body.clientHeight
            setBlogHeight(windowHeight-height-85)
        })
    },[])
    
    // 发布博客
    const release = async () =>{
        let blog = {

        };
        let result = await api_addBlog(blog);
        console.log(result.data)
    }
    return(
        <>
            <Card bodyStyle={{display:'flex'}} >
                <Input placeholder='输入文章标题...' style={{backgroundColor:'white',minHeight:50,height:'5%',border:0,fontSize:25}} id="blogTitle"/>
                <Button type="outline" className="blog-edit-title-button blog-edit-title-caogao">草稿箱</Button>
                <Button type="primary" className="blog-edit-title-button" onClick={release}>发布</Button>
            </Card>
            <MdEditor modelValue={blogVal} onChange={setBlogVal} style={{height:blogHeight+"px"}}/>
        </>
    )
}
export default AddBlog;