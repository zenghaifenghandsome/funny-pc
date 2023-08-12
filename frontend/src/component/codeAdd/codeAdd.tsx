import { Avatar, Button, Cascader, Form, Input, Message, Modal} from "@arco-design/web-react";
import {IconCode, IconEdit} from '@arco-design/web-react/icon'
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { api_addBc, api_upload } from "../../tools/ajax";
import "./codeAdd.less";
import codeTags from "./codeTags";
const CodeAdd = () =>{
  const userinfo = useSelector((state:any)=> state.user.value)
  const [visi,setVisi] = useState<boolean>(false);
  const fileRef = useRef<any>();
  const [bcIcon,setBcIcon] = useState<any>("");
  const [tags,setTags] = useState<any>();
  const [form]=Form.useForm();

  const titleRef = useRef<any>();
  const linkRef = useRef<any>();
  const describRef = useRef<any>();
  const detailRef = useRef<any>();
  //const tagsRef = useRef<any>();
  const onSelectfile = () =>{
    fileRef.current.click()
  }
  const selectFiles = (event:any) =>{
    upload(event.target.files[0])
  }
  const uploads = async(formData:FormData) =>{
    let result:any = await api_upload(formData)
    setBcIcon(result.url)
  }
  const upload = async (file:any) =>{
    const formData = new FormData();
    formData.append("imgfile",file)
    await uploads(formData);
  }
  const addBc = async (bc:any) =>{
    let result:any = await api_addBc(bc)
    if(result.status===200){
      Message.success(result.msg);
    }else{
      Message.warning(result.msg)
    }
  }
  const doOk = async () =>{
    let bc = {
      iconaddr:bcIcon,
      title:titleRef.current.dom.value,
      link:linkRef.current.dom.value,
      describ:describRef.current.dom.value,
      detail:detailRef.current.dom.value,
      tags:tags,
      userid:userinfo.userid+"",
      look:0,
      like:0,
      username:userinfo.username,
      avater:userinfo.avator,
      commentnumb:0,
      status:1,
    }
    //console.log(bc)
    await addBc(bc);
    setVisi(false);
  }
  const selectTag = (x:any) =>{
    let tagsArray:Array<string> = []
    for(let i=0; i<x.length;i++){
      //console.log(x[i])
      tagsArray.push(x[i][0])
    }
    setTags(tagsArray.toString())
  }
  const cancelHandle = () =>{
    setVisi(false)
    form.resetFields();

  }
  
  return(
    <>
      <Button type="primary" size='large' style={{marginLeft:7,marginBottom:5}} onClick={()=>{setVisi(true)}} icon={<IconCode />}/>
      <Modal style={{width:"50vw"}} title="推荐资源" visible={visi} onOk={doOk} className="addBc-modal" onCancel={cancelHandle}>
        <Form form={form} className="addBc-box" style={{display:'grid',gridTemplateColumns:"114px auto"}}>
          <div className="addBc-info-avator">
            <Form.Item field="avator">
              <div className="bc-upload-avator">
                <Avatar 
                style={{width:90,height:90}}
                triggerIcon={<IconEdit onClick={onSelectfile} />}
                ><img src={bcIcon} alt="logo" /></Avatar>
                <input ref={fileRef} type="file" onChange={selectFiles} className="uploadBnt"/>
                <div className="avator-title" >资源logo</div>
                <div className="avatorFileTypeRange">支持 jpg、png、jpeg 格式大小 5M 以内的图片</div>
              </div>
            </Form.Item>
          </div>
          <div>
            <Form.Item field="title" label="标题">
              <Input ref={titleRef} />
            </Form.Item>
            <Form.Item field="link" label="链接">
              <Input ref={linkRef} />
            </Form.Item>
            <Form.Item field="tag" label="标签">
              <Cascader options={codeTags} 
              mode="multiple" placeholder="请选择一下标签" 
              fieldNames={{children:"child",label:"name",value:"id"}}
              showSearch={{retainInputValueWhileSelect: true}} 
              allowClear
              onChange={selectTag}
              />
            </Form.Item>
            <Form.Item field="detail" label="简介">
              <Input ref={describRef} />
            </Form.Item>
            <Form.Item field="info" label="详情">
              <Input.TextArea ref={detailRef} />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}
export default CodeAdd;