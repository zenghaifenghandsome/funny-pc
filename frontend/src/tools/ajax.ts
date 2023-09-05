import { Message } from "@arco-design/web-react";
import axios from "axios";

let baseURL = 'http://localhost:9000'
//const musicUrl='http://101.35.101.200:3000'

const ajax = (url:string,data:object={},method:string="GET")=>{
    axios.defaults.timeout=20000
    return new Promise((resovle:any,reject:any)=>{
        let promise
        if(method==="POST"){
           promise= axios.post(url,data)
        }else{
            promise= axios.get(url,{params:data})
        }

        promise.then((req:any)=>{
            resovle(req.data)
        }).catch((err:Error)=>{
            Message.error("请求出错：")
        })
    })
    
   
}

export const api_login = (username:string,password:string) => ajax(baseURL+'/login',{username,password},'POST')
export const api_register = (user:any) => ajax(baseURL+"/register",user,"POST");

export const api_getUserInfo = (userid:number) => ajax(baseURL+"/user/getUserInfo",{userid})
export const api_updataUserInfoOneField = (updata:any) => ajax(baseURL+"/user/updataUserInfoOneField",updata)

export const api_upload = (file:any) => ajax(baseURL+"/update",file,"POST")


export const api_addBc = (bc:any) => ajax(baseURL+"/biancheng",bc,"POST")
export const api_getAllBCs = () => ajax(baseURL+"/biancheng")
export const api_getAllOkBc = () => ajax(baseURL+"/biancheng/okAllBiancheng")
export const api_deleteBc = (id:any) => ajax(baseURL+"/biancheng/deletBiancheng",{id})
export const api_getBcComment = (id:any) => ajax(baseURL+"/biancheng/comment",{id})
//add bcComment 
export const api_addBcComment = (bcComment:any) => ajax(baseURL+"/biancheng/comment",bcComment,'POST')
//get replyComments
export const api_getReplyComments = (bcCommentID:string) => ajax(baseURL+"/biancheng/comment/replyComment",{bcCommentID})
//add replyComment
export const api_addReplyComment = (reply:any) => ajax(baseURL+"/biancheng/comment/replyComment",reply,"POST")

// blog
export const api_getAllOkBlogs= ()=> ajax(baseURL+"/blog/allOkBlog")
export const api_addBlog = (data:any) => ajax(baseURL+"/blog/release",data,"POST")
export const api_getThisBlog = (blogID:any) => ajax(baseURL+'/blog/blogArticle',{"blogID":blogID})

export const api_getBianChengDetail = (id:any) => ajax(baseURL+'/biancheng/getOnlybiancheng',{"id":id})

//video
 export const api_getVideoSourceList = () => ajax(baseURL+"/video")
 export const api_videoProxy = (url:any) => ajax(baseURL+"/video/proxy",{"url":url})
 export const api_getVideoList = (url:string,t:string,pg:number) => ajax(baseURL+"/video/video/videoGet",{url,t,pg})

/**
 * evd
 */
export const api_evd_addEvd = (evd:any) => ajax(baseURL+"/evd",evd,"POST");
export const api_evd_getAllEvd = () => ajax(baseURL+"/evd");