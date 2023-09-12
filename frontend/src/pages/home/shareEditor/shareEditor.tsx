import {Badge, Button, Card, Image, Input, Message, Upload} from '@arco-design/web-react';
import { RequestOptions } from '@arco-design/web-react/es/Upload';
import { IconDelete, IconEye, IconLeft } from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';
import { api_addShare, api_upload } from '../../../tools/ajax';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const ShareEditor = () => {
    const userinfo = useSelector((state:any) => state.user.value);
    const [content,setContent] = useState<string>();
    const [picList,setPicList] = useState<Array<string>>([]);
    const nav = useNavigate();
    const cancel = () => {
        nav(-1)
    }
    const upload = async (uploadProps:RequestOptions) =>{
        if(picList.length<9){
            const formData:FormData = new FormData();
            formData.append("imgfile",uploadProps.file);
            let result: any = await api_upload(formData);
            if (result.status === 200) {
                Message.success(result.msg);
                //picList.push(result.url)
                setPicList(oldArray => [...oldArray,result.url]);
                console.log(picList);
            }else{
                Message.success(result.msg);
            }
        }else{
            Message.error("最多上传9张图片")
        }
    }
    const delete_pic = (pic:string) => {
        setPicList(picList.filter(p => p != pic));
    }
    const send = async () => {
        let share = {
            userid: userinfo.userid,
            content: content,
            piclist: picList.join()
        }
        let result:any = await api_addShare(share);
        if(result.status === 200){
            Message.success(result.msg)
            nav("/")
        }else{
            Message.error(result.msg)
        }
    }
    const change = (value:string) => {
        setContent(value);
        console.log(content);
    }
    return (
        <>
            <Card style={{width:'100%'}}>
                <div style={{display:'grid',gridTemplateColumns:'50px auto 50px',marginRight:50}}>
                    <div className='shareEditor-cancelBnt'>
                        <IconLeft className='shareEditor-cancelBnt' onClick={cancel}/>
                    </div>
                    <div></div>
                    <div >
                        <Button type='primary' onClick={send} style={{marginLeft:'80%',right:10}}>发送</Button>
                    </div>
                </div>
                
            </Card>
            <Card style={{height:'90%'}}>
                <Input.TextArea 
                style={{minHeight:64}} 
                placeholder='分享新鲜事···'
                value={content}
                onChange={change}
                />
                    { picList.length >= 1 ?  picList.map(pic =>(
                        <Image 
                        src={pic} 
                        key={pic} 
                        style={{marginTop:10}}
                        width={80} 
                        height={80} 
                        actions={[<IconDelete onClick={() => delete_pic(pic)}/>]}
                        />
                    )):<div></div>   
                    }
                {picList.length < 9 ?<Upload 
                style={{marginTop:10}}
                multiple
                imagePreview
                listType='picture-card'
                customRequest={upload}
                showUploadList={false}
                /> : <span></span>}
            </Card>
        </>
    )
}
export default ShareEditor;