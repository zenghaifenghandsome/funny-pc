import { Avatar, Card } from "@arco-design/web-react";
import { FC, useEffect, useState } from "react";
import { api_getUserInfo } from "../../tools/ajax";

const EvdBody = (props) =>{
    const [user,setUser] = useState();


    const getUserInfo = async(userid) =>{
        let result = await api_getUserInfo(userid)
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