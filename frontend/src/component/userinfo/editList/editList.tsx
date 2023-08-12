import { Button, Input, Message, Modal } from "@arco-design/web-react";
import { IconEdit } from "@arco-design/web-react/icon";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api_updataUserInfoOneField } from "../../../tools/ajax";
import './editList.less';


const EditList = (props:any) =>{
    const [visible,setVisible] = useState<boolean>(false);
    const [propsValue,setPropsValue] = useState<any>(props.value);

    const userinfo = useSelector((state:any)=> state.user.value)
    useEffect(()=>{
        console.log(props)
    },[])

    const doEditOk = () =>{
        console.log(propsValue)
        let updata = {
            userid:userinfo.userid,
            field:props.label,
            newDate:propsValue,
        }
        api_updataUserInfoOneField(updata).then((req:any)=>{
            console.log(req.data);
            if(req.data.status===200){
                Message.success("修改成功！！！")
                setVisible(false);
            }else{
                Message.error("修改失败！！")
            }
        }).catch((err:any)=>{ console.log(err)})
    }
    return(
        <div style={{display:"flex",marginTop:10}}>
            <div className="editList-label">{props.label}</div>
            <div className="editList-value">{props.value}</div> 
            <Button onClick={()=> setVisible(true)} type="primary" icon={<IconEdit />}/>
            <Modal visible={visible} onOk={doEditOk} onCancel={()=>setVisible(false)}>
                <div>{props.label}</div>
                <Input value={propsValue} onChange={(value)=>setPropsValue(value)}/>
            </Modal>
        </div>
    )
}
export default EditList;