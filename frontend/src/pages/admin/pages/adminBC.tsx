import { Button, Card, Divider, Empty, Message } from "@arco-design/web-react";
import { useEffect, useState } from "react";
import { api_deleteBc, api_getAllBCs } from "../../../tools/ajax";
import './adminChildren.less';

const AdminBC =()=>{
    const [bcList,setBcList]= useState<Array<string>>([]);
    const getbcs = async () =>{
        let result:any = await api_getAllBCs();
        setBcList(result.data);
    }
    const deletbc = async (id:any) =>{
        let result:any = await api_deleteBc(id);
        if(result.code===6001){
            Message.success(result.msg);
        }
    }
    useEffect(()=>{
        getbcs();
    },[])
    const deletHandle = (id:any) =>{
        deletbc(id);
    }
    if(bcList.length===0){
        return <Empty />
    }
    return(
        <>
            <Card bodyStyle={{padding:10}}>
                {bcList.map((bc:any)=>(
                    <div key={bc.ID}>
                        <div className="bcList">
                            <div>
                                <div  style={{margin:10}}>{bc.title}</div>
                                <div>{bc.detail}</div>
                            </div>
                            <div className="bc-buttonGroup">
                                <Button type="primary">审核</Button>
                                <Button type="primary">修改</Button>
                                <Button type="primary" onClick={()=>deletHandle(bc.ID)}>删除</Button>
                            </div>
                        </div>
                        <Divider />
                    </div>
                   
                ))}
            </Card>
        </>
    )
}
export default AdminBC;