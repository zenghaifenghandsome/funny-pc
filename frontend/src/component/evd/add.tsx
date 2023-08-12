import { Button, Input, Message, Modal, Upload } from "@arco-design/web-react";
import { IconBranch } from "@arco-design/web-react/icon";
import { FC, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { api_evd_addEvd, api_upload } from "../../tools/ajax";

interface evdBody{
    userid:string,
    imgList?:string,
    content?:string
}

const addevd = async (evdBody:evdBody) =>{
    let result:any = await api_evd_addEvd(evdBody);
    if (result.status=200){
        Message.success({
            content:result.msg
        })
    }else{
        Message.error({
            content:result.msg
        })
    }
}

const AddEvd:FC = () =>{
    const [isVisi,setVisi] = useState<boolean>(false);
    const [isLoad,setLoad] = useState<boolean>(false);
    const userinfo = useSelector((state:any)=> state.user.value)
    const [fileList,setFileList] = useState<Array<string>>([]);
    const fileRef = useRef<any>();
    const contentRef = useRef<any>();
    const selectFile = () =>{
        fileRef.current.click();
        setLoad(true);
    }
    const fileChange = (event:any) =>{
        console.log(event.target.files);
        upload(event.target.files[0])
    }

    const upload = (file:any) =>{
        const formData:FormData = new FormData();
        formData.append("imgfile",file);
        uploads(formData);
    }

    const uploads = async (formData:any) =>{
        //console.log(formData)
        //const files:Array<string> = [...fileList];
        let result:any = await api_upload(formData)
        console.log(result.url);
        setFileList([...fileList,result.url]);
        setLoad(false);

    }
    const Ok = async () => {
        let evdBody:evdBody = {
            userid:userinfo.userid+"",
            imgList:fileList.toString(),
            content:contentRef.current.dom.value
        }
        console.log(evdBody);
        addevd(evdBody);
        setVisi(false);

    }
    return(
        <>
            <Button 
            type="primary" 
            size='large' 
            style={{marginLeft:7,marginBottom:5}} 
            icon={<IconBranch />} 
            onClick={()=>setVisi(true)} />
            <Modal
            visible={isVisi}
            onCancel={() => setVisi(false)}
            onOk={Ok}
            >
                <div>
                    <Button type="primary" onClick={selectFile} loading={isLoad}>点击上传</Button>
                    <input ref={fileRef} onChange={fileChange}  type='file' style={{display:"none"}}/>
                    <div>{fileList?.length>0?fileList.map((url,index)=>(
                        <img key={index} width={50} height={50} src={url}/>
                    )):null}</div>
                </div>
                <div>
                    <Input.TextArea ref={contentRef}/>
                </div>
            </Modal>
        </>
    )
}
export default AddEvd;