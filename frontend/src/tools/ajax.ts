import { Message } from "@arco-design/web-react";
import axios from "axios";

let baseURL = 'http://localhost:8000'
const musicUrl='http://101.35.101.200:3000'
const cookie="NMTID=00OCi7M1t6BpKAuCEH4lK-Jr8NXYuEAAAGAqO2Ftg; Max-Age=315360000; Expires=Thu, 06 May 2032 13:06:20 GMT; Path=/;;MUSIC_A_T=1601877509256;" +
    " Max-Age=2147483647; Expires=Sat, 27 May 2090 16:20:27 GMT; Path=/wapi/clientlog;;MUSIC_A_T=1601877509256; Max-Age=2147483647; Expires=Sat, 27 May 2090 16:20:27 GMT;" +
    " Path=/neapi/feedback;;MUSIC_A_T=1601877509256; Max-Age=2147483647; Expires=Sat, 27 May 2090 16:20:27 GMT; Path=/api/clientlog;;__remember_me=true; Max-Age=1296000; " +
    "Expires=Tue, 24 May 2022 13:06:20 GMT; Path=/;;MUSIC_A_T=1601877509256; Max-Age=2147483647; Expires=Sat, 27 May 2090 16:20:27 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1601877569490;" +
    " Max-Age=2147483647; Expires=Sat, 27 May 2090 16:20:27 GMT; Path=/eapi/feedback;;MUSIC_A_T=1601877509256; Max-Age=2147483647; Expires=Sat, 27 May 2090 16:20:27 GMT; Path=/weapi/clientlog;;" +
    "MUSIC_R_T=1601877569490; Max-Age=2147483647; Expires=Sat, 27 May 2090 16:20:27 GMT; Path=/api/feedback;;MUSIC_R_T=1601877569490; Max-Age=2147483647; Expires=Sat, 27 May 2090 16:20:27 GMT; " +
    "Path=/neapi/clientlog;;MUSIC_R_T=1601877569490; Max-Age=2147483647; Expires=Sat, 27 May 2090 16:20:27 GMT; Path=/wapi/feedback;;MUSIC_A_T=1601877509256; Max-Age=2147483647; Expires=Sat, 27 May 2090 16:20:27 GMT; " +
    "Path=/wapi/feedback;;MUSIC_A_T=1601877509256; Max-Age=2147483647; Expires=Sat, 27 May 2090 16:20:27 GMT; Path=/weapi/feedback;;MUSIC_R_T=1601877569490; Max-Age=2147483647; Expires=Sat, 27 May 2090 16:20:27 GMT;" +
    " Path=/api/clientlog;;MUSIC_R_T=1601877569490; Max-Age=2147483647; Expires=Sat, 27 May 2090 16:20:27 GMT; Path=/weapi/feedback;;MUSIC_A_T=1601877509256; Max-Age=2147483647; Expires=Sat, 27 May 2090 16:20:27 GMT;" +
    " Path=/openapi/clientlog;;MUSIC_A_T=1601877509256; Max-Age=2147483647; Expires=Sat, 27 May 2090 16:20:27 GMT; Path=/eapi/feedback;;" +
    "MUSIC_U=0e4133e728c8e186774b4ed1517231464755f534cb154fec2213b89729a1cb8f519e07624a9f0053ec5be27974f8bd2680cd06c96e431534b3bb6b17294dc3718cd8b1cc07a9da0e7a561ba977ae766d; Max-Age=1296000; Expires=Tue, 24 May 2022 13:06:20 GMT;" +
    " Path=/;;MUSIC_A_T=1601877509256; Max-Age=2147483647; Expires=Sat, 27 May 2090 16:20:27 GMT; Path=/api/feedback;;MUSIC_R_T=1601877569490; " +
    "Max-Age=2147483647; Expires=Sat, 27 May 2090 16:20:27 GMT; Path=/neapi/feedback;;__csrf=d259d19e7f1c08da8e779ae25fd65efb; Max-Age=1296010; Expires=Tue, 24 May 2022 13:06:30 GMT; Path=/;;MUSIC_SNS=; Max-Age=0;" +
    " Expires=Mon, 09 May 2022 13:06:20 GMT; Path=/;MUSIC_R_T=1601877569490; Max-Age=2147483647; Expires=Sat, 27 May 2090 16:20:27 GMT; Path=/eapi/clientlog;;MUSIC_R_T=1601877569490; Max-Age=2147483647; " +
    "Expires=Sat, 27 May 2090 16:20:27 GMT; Path=/openapi/clientlog;;MUSIC_A_T=1601877509256; Max-Age=2147483647; Expires=Sat, 27 May 2090 16:20:27 GMT; " +
    "Path=/eapi/clientlog;;MUSIC_R_T=1601877569490; Max-Age=2147483647; Expires=Sat, 27 May 2090 16:20:27 GMT; Path=/wapi/clientlog;;MUSIC_R_T=1601877569490; " +
    "Max-Age=2147483647; Expires=Sat, 27 May 2090 16:20:27 GMT; Path=/weapi/clientlog;"



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

export const api_getAllOkBlogs= ()=> ajax(baseURL+"/blog/allOkBlog")

export const api_getThisBlog = (blogID:any) => ajax(baseURL+'/blog/blogArticle',{"blogID":blogID})

export const api_getplaylistinfo = (id:any) => ajax(musicUrl+'/playlist/detail',{"id":id,"cookie":cookie})
export const api_getplaylist = (id:any) => ajax(musicUrl+'/playlist/track/all',{"id":id,"cookie":cookie})

//music
export const api_getMusicBanner = () => ajax(musicUrl+'/banner')
export const api_getBianChengDetail = (id:any) => ajax(baseURL+'/biancheng/getOnlybiancheng',{"id":id})
export const api_getSongFormList = (data:any) => ajax(musicUrl+'/personalized',{"limit":data})


//video
 export const api_getVideoSourceList = () => ajax(baseURL+"/video")
 export const api_videoProxy = (url:any) => ajax(baseURL+"/video/proxy",{"url":url})
 export const api_getVideoList = (url:string,t:string,pg:number) => ajax(baseURL+"/video/video/videoGet",{url,t,pg})

/**
 * evd
 */
export const api_evd_addEvd = (evd:any) => ajax(baseURL+"/evd",evd,"POST");
export const api_evd_getAllEvd = () => ajax(baseURL+"/evd");