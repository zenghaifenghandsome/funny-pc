import { Message } from "@arco-design/web-react";
import axios from "axios";

let baseURL = 'http://localhost:9000'
//const musicUrl='http://101.35.101.200:3000'

const ajax = (url,data,method="GET")=>{
    axios.defaults.timeout=20000
    return new Promise((resovle,reject)=>{
        let promise
        if(method==="POST"){
           promise= axios.post(url,data)
        }else{
            promise= axios.get(url,{params:data})
        }

        promise.then((req)=>{
            resovle(req.data)
        }).catch((err)=>{
            Message.error("请求出错：")
        })
    })
    
   
}

export const api_login = (username,password) => ajax(baseURL+'/login',{username,password},'POST')
export const api_register = (user) => ajax(baseURL+"/register",user,"POST");

export const api_getUserInfo = (userid) => ajax(baseURL+"/user/getUserInfo",{userid})
export const api_updataUserInfoOneField = (updata) => ajax(baseURL+"/user/updataUserInfoOneField",updata)

export const api_upload = (file) => ajax(baseURL+"/update",file,"POST")

// share
export const api_addShare = (share) => ajax(baseURL+"/share/add",share,"POST")
export const api_getAllShare = () => ajax(baseURL+"/share/getAll")
//topic
export const api_addTopic = (topic) => ajax(baseURL+"/topic",topic,"POST")

//bc
export const api_addBc = (bc) => ajax(baseURL+"/biancheng",bc,"POST")
export const api_getAllBCs = () => ajax(baseURL+"/biancheng")
export const api_getAllOkBc = () => ajax(baseURL+"/biancheng/okAllBiancheng")
export const api_deleteBc = (id) => ajax(baseURL+"/biancheng/deletBiancheng",{id})
export const api_getBcComment = (id) => ajax(baseURL+"/biancheng/comment",{id})
//add bcComment 
export const api_addBcComment = (bcComment) => ajax(baseURL+"/biancheng/comment",bcComment,'POST')
//get replyComments
export const api_getReplyComments = (bcCommentID) => ajax(baseURL+"/biancheng/comment/replyComment",{bcCommentID})
//add replyComment
export const api_addReplyComment = (reply) => ajax(baseURL+"/biancheng/comment/replyComment",reply,"POST")

// blog
export const api_getAllOkBlogs= ()=> ajax(baseURL+"/blog/allOkBlog")
export const api_addBlog = (data) => ajax(baseURL+"/blog/release",data,"POST")
export const api_getThisBlog = (blogID) => ajax(baseURL+'/blog/blogArticle',{"blogID":blogID})

export const api_getBianChengDetail = (id) => ajax(baseURL+'/biancheng/getOnlybiancheng',{"id":id})

//video
 export const api_getVideoSourceList = () => ajax(baseURL+"/video")
 export const api_videoProxy = (url) => ajax(baseURL+"/video/proxy",{"url":url})
 export const api_getVideoList = (url,t,pg) => ajax(baseURL+"/video/video/videoGet",{url,t,pg})

/**
 * evd
 */
export const api_evd_addEvd = (evd) => ajax(baseURL+"/evd",evd,"POST");
export const api_evd_getAllEvd = () => ajax(baseURL+"/evd");