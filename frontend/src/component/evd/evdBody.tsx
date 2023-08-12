import { Avatar, Card } from "@arco-design/web-react";
import { FC, useEffect, useState } from "react";
import { api_getUserInfo } from "../../tools/ajax";
interface evdBodyProps{
    id:string,
    userid:number,
    imgList?:string,
    content?:string

}
const EvdBody:FC<evdBodyProps> = (props:evdBodyProps) =>{
    const [user,setUser] = useState<any>();


    const getUserInfo = async(userid:number) =>{
        let result:any = await api_getUserInfo(userid)
        setUser(result.userinfo);
        console.log(user);
    }
    useEffect(()=>{
        getUserInfo(props.userid);
    },[])
    return(
        <>
            <Card>
                <div>
                    <Avatar>
                        
                    </Avatar>
                    
                </div>
            </Card>
        </>
    )
}
export default EvdBody;