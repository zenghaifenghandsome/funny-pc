import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNav from "./adminNav";

const Admin = () =>{
    const route = useNavigate()
    useEffect(()=>{
        route("/admin/biancheng")
    },[])
    return(
        <>
            <div><AdminNav /></div>
            <div><Outlet /></div>
        </>
    )
}
export default Admin;