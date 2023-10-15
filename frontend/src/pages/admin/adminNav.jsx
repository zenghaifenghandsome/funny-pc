import { Menu } from "@arco-design/web-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminNav = () =>{
    const route = useNavigate()
    useEffect(()=>{
        route("/admin/biancheng")
    },[])

    const selectHandle = (key) =>{
        route(key)
    }
    return (
        <>
            <div >
                <Menu mode="horizontal" theme="light" defaultSelectedKeys={["/admin/biancheng"]} onClickMenuItem={selectHandle}>
                    <Menu.Item key="/admin/biancheng">编程导航</Menu.Item>
                    <Menu.Item key="/admin/blog">博客</Menu.Item>
                </Menu>
            </div>
        </>
    )
}
export default AdminNav;