import { Button, Card, Input } from "@arco-design/web-react";
import Md from '../../../../node_modules/md-editor-rt';
import 'md-editor-rt/lib/style.css';
import './addBlog.less';
import { useEffect, useState } from "react";

const AddBlog = () =>{
    const [blogVal,setBlogVal] = useState<any>()
    const [blogHeight,setBlogHeight]= useState<any>()
    useEffect(()=>{
        let height:any = document.getElementById('blogTitle')?.offsetHeight
        let windowHeight = document.body.clientHeight
        setBlogHeight(windowHeight-height-85)
        window.addEventListener('resize',()=>{
            let height:any = document.getElementById('blogTitle')?.offsetHeight
            let windowHeight = document.body.clientHeight
            setBlogHeight(windowHeight-height-85)
        })
    },[])
    const release = () =>{
        
    }
    return(
        <>
            <Card bodyStyle={{display:'flex'}} >
                <Input placeholder='输入文章标题...' style={{backgroundColor:'white',minHeight:50,height:'5%',border:0,fontSize:25}} id="blogTitle"/>
                <Button type="outline" className="blog-edit-title-button blog-edit-title-caogao">草稿箱</Button>
                <Button type="primary" className="blog-edit-title-button" onClick={release}>发布</Button>
            </Card>
            <Md modelValue={blogVal} onChange={setBlogVal} style={{height:blogHeight+"px"}}/>
        </>
    )
}
export default AddBlog;