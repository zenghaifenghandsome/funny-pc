import { Avatar, Button, Card } from "@arco-design/web-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserCenter = () =>{
    const userinfo = useSelector((state:any)=> state.user.value)
    const  route = useNavigate()
    const toEditUseInfo = () =>{
        route("/editUserInfo")
    }
    if(userinfo===null || userinfo===undefined){
        route("/login")
    }
    return(
        <>
            <Card>
                <div>
                    <div>
                        <Avatar><img alt="头像" src={userinfo.avator} /></Avatar>
                    </div>
                    <div>
                        <div>{userinfo.username}</div>
                        <div>
                            <Button type="outline" onClick={toEditUseInfo}>编辑个人资料</Button>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}
export default UserCenter;