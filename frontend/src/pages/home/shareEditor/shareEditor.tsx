import { Button, Card, Image,Input, Message, Modal, Upload} from '@arco-design/web-react';
import { RequestOptions } from '@arco-design/web-react/es/Upload';
import { IconDelete, IconEye, IconLeft } from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';
import { api_addShare, api_addTopic, api_upload } from '../../../tools/ajax';
import { useEffect, useState,useRef } from 'react';
import { useSelector } from 'react-redux';
import Tribute from 'tributejs';
import { v4 as uuidv4 } from 'uuid';

const ShareEditor = () => {
    const userinfo = useSelector((state:any) => state.user.value);
    const [content,setContent] = useState<string>();
    const [topicContent,setTopicContent] = useState<string>('');
    const [picList,setPicList] = useState<Array<string>>([]);
    const [visible,setVisible] = useState<boolean>(false);
    const addTopicRef = useRef<any>()
    const [atList, setAtList] = useState([
        {
          key: "1",
          value: "小明",
          position: "前端开发工程师"
        },
        {
          key: "2",
          value: "小李",
          position: "后端开发工程师"
        }
      ]);
      const [poundList, setpoundList] = useState([
        { name: "JavaScript", explain: "前端开发语言" },
        { name: "Java", explain: "后端开发语言之一" }
      ]);
    const nav = useNavigate();
    const cancel = () => {
        nav(-1)
    }
    useEffect(() => {
       renderEditor(atList,poundList);
    }, []);
    const renderEditor = (_atList:any[],_poundList:any[]) => {
        let tributeMultipleTriggers = new Tribute({
            allowSpaces:true,
            noMatchTemplate: function () {return '';},
            collection:[
                {
                    selectTemplate: function(item){
                        if (this.range.isContentEditable(this.current.element)) {
                            return (
                              `<span contenteditable="false">
                                <span
                                  class="at-item"
                                  title="${item.original.value}"
                                >
                                  <a href='#'>@${item.original.value}</a>
                                </span>
                              </span>`
                            );
                          }
              
                          return "@" + item.original?.value;
                    },
                    values: _atList,
                    menuItemTemplate: function (item) {
                        return item.original.value;
                    },
                },
                {
                    trigger: "#",
                    selectTemplate: function(item) {
                      if (this.range.isContentEditable(this.current.element)) {
                        return (
                          `<span contenteditable="false">
                            <span
                              class="pound-item"
                            >
                              <a href='#'>#${item.original.name}#</a>
                            </span>
                          </span>`
                        );
                      }
          
                      return "#" + item.original.name + '#';
                    },
                    values: _poundList,
                    lookup: "name",
                    fillAttr: "name"
                  }
            ]
        });
        tributeMultipleTriggers.attach(document.getElementById("editorMultiple") as HTMLElement);
    }
    const htmlEscape = (html: string) => {
        return html.replace(/[<>"&]/g,function(match,pos,originalText){
          switch(match){
            case "<":
                return "&lt;";
            case ">":
                return "&gt;"
            case "&":
                return "&amp;";
            case "\"":
                return "&quot;";
            default:
              return match;
          }
        });
      }
      const getDataOfEditorMultiple = () => {
        const childrenData = document.getElementById('editorMultiple')?.innerHTML;
        console.log('childrenData', childrenData)
        const toServiceData = htmlEscape(childrenData||'');
        console.log('toServiceData', toServiceData)
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
    const addTopic = async () => {
        let uuid = uuidv4();
        let topic = {
            topicuuid:uuid,
            topicname:topicContent,
            topictype:"share-topic",
            topicurl:"http://localhost:5173/#/share/allshare/topic/"+uuid,
            topiccreator:userinfo.userid+'',
            topiccontent:"",
        }
        console.log(topic)
        let result:any = await api_addTopic(topic)
        console.log(result)
        if(result.status === 200){
            Message.success(result.msg)
        }else{
            Message.error(result.msg)
        }

        setTopicContent('')
        setVisible(false)
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
            <Modal visible={visible} 
                onOk={addTopic} 
                onCancel={()=> setVisible(false)}
                title='新建话题-让大家参与进来吧'
                >
                <Input   value={topicContent} onChange={setTopicContent}/>
            </Modal>
            <Card style={{height:'90%'}}>
                <div className="at-demo">
                    <div 
                    id='editorMultiple'
                    placeholder="请输入"
                    className="tribute-demo-input"
                    ></div>
                </div>
                
                <div className='shareEditor-topic' onClick={()=> setVisible(true)}>#话题</div>
                <Button onClick={getDataOfEditorMultiple}>查看内容</Button>
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