import { Button, Input, Message, Modal, Upload } from "@arco-design/web-react";
import { IconBranch } from "@arco-design/web-react/icon";
import { FC, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { api_evd_addEvd, api_upload } from "../../tools/ajax";

const addevd = async (evdBody) =>{
    let result = await api_evd_addEvd(evdBody);
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

const AddEvd = () =>{
    const [isVisi,setVisi] = useState(false);
    const [isLoad,setLoad] = useState(false);
    const userinfo = useSelector((state)=> state.user.value)
    const [fileList,setFileList] = useState([]);
    const fileRef = useRef();
    const contentRef = useRef();
    const selectFile = () =>{
        fileRef.current.click();
        setLoad(true);
    }
    const fileChange = (event) =>{
        console.log(event.target.files);
        upload(event.target.files[0])
    }

    const upload = (file) =>{
        const formData = new FormData();
        formData.append("imgfile",file);
        uploads(formData);
    }

    const uploads = async (formData) =>{
        let result = await api_upload(formData)
        console.log(result.url);
        setFileList([...fileList,result.url]);
        setLoad(false);

    }
    const Ok = async () => {
        let evdBody = {
            userid:userinfo.userid+"",
            imgList:fileList.toString(),
            content:contentRef.current.dom.value
        }
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