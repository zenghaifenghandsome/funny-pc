import { Avatar, Button, Card, Message} from "@arco-design/web-react";
import { UploadItem } from "@arco-design/web-react/es/Upload";
import { IconEdit, IconLeft } from "@arco-design/web-react/icon";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainSpin from "../../../component/mainSpin/mainSpin";
import EditList from "../../../component/userinfo/editList/editList";
import { api_getUserInfo, api_updataUserInfoOneField, api_upload } from "../../../tools/ajax";
import { userUpdata } from "../../../tools/localstore";
import { updata } from "../../../tools/redux/reducer/userReducer";
import './userinfo.less';

const UserInfo = () =>{
    const userinfo = useSelector((state)=> state.user.value)
    const route = useNavigate()
    const [info,setInfo]= useState(null);
    
    const fileRef = useRef()
    const dispatch = useDispatch()
    
    const toUserCenter = () =>{
        route("/userCenter");
    }
    const getUserInfo = async (id) =>{
        let result = await api_getUserInfo(id)
       
        setInfo(result.data)
    }
    useEffect(()=>{
        
        if(userinfo===null || userinfo===undefined){
            route("/login")
        }else{
           getUserInfo(userinfo.userid)
          // console.log(info)
        }
       
    },[userinfo])

    const onSelectfile = () =>{
        fileRef.current.click()
    }
    const updataUserInfoOneField = async(user) =>{
        let result = await api_updataUserInfoOneField(user);
        if(result.status===200){
            Message.success(result.msg)
            userUpdata()
            dispatch(updata())
        }else{
            Message.error(result.msg)
        }
    }
    const uploads = async (formData) =>{
        //console.log(formData)
        let user = await api_upload(formData)
        //console.log(user.url)
        await updataUserInfoOneField({
            userid:userinfo.userid,
            field:"avater",
            newDate:user.url
        })
        
    }
    const upload =  (file) =>{
        
        const formData = new FormData();
        formData.append("imgfile",file)
        
        uploads(formData)
    }

    const selectFiles = (event) =>{
       
        upload(event.target.files[0])
    }
    if(userinfo===null || userinfo===undefined){
        route("/login")
    }
    if (info===null){
        return <MainSpin />
    }else return(
        <div className="userinfo-box">
            <div style={{backgroundColor:"white",color:'#ABABAC',width:"100%"}}>
                <Button type="primary" icon={<IconLeft />} style={{backgroundColor:"white",color:'#ABABAC'}} onClick={toUserCenter}>返回个人主页</Button>
            </div>
            
            <div className="userinfo-card">
                <Card className="userinfo-card-menu" title='menu' style={{width:200}}>
                    <div>menu</div>
                </Card>
                <Card className="userinfo-card-info" title="个人资料"  bodyStyle={{display:'flex'}}>
                    <div className="userinfo-card-info-info">
                        {
                            <div>
                                <EditList label="username" value={info.username} />
                                <EditList label="qq" value={info.QQ} />
                                <EditList label="addr" value={info.addr} />
                                <EditList label="decrib" value={info.decrib} />
                                <EditList label="email" value={info.email} />
                                <EditList label="nick_name" value={info.nickname} />
                                <EditList label="phone" value={info.phone} />
                                <EditList label="wechat" value={info.wechat} />
                            </div>  
                        }
                    </div>
                    <div className="userinfo-card-info-avatar">
                        <Avatar 
                        style={{width:90,height:90}}
                        triggerIcon={<IconEdit onClick={onSelectfile} />}
                        ><img src={userinfo.avator} alt="头像" /></Avatar>
                        <input ref={fileRef} type="file" onChange={selectFiles} className="uploadBnt"/>
                        <div className="avator-title" >我的头像</div>
                        <div className="avatorFileTypeRange">支持 jpg、png、jpeg 格式大小 5M 以内的图片</div>
                    </div>
                </Card>
            </div>
        </div>
    )

}
export default UserInfo;