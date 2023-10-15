import { Card,Avatar,Tag, Divider } from "@arco-design/web-react";
import {IconEye, IconHeartFill} from '@arco-design/web-react/icon';
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "../../../component/comment/comment";
import MainSpin from "../../../component/mainSpin/mainSpin";
import TimeAgo from "../../../component/timeAgo/timeAgo";
import { api_getBianChengDetail } from "../../../tools/ajax";
import './bcDetail.less';

const BcDetail = () =>{
    const [bcDetail,setBcDetail] = useState<any>(null);
    let props = useParams()

    const getDetail = async (id) =>{
        let result = await api_getBianChengDetail(id);
        console.log(result)
        setBcDetail(result.bcInfo);
    }
    useEffect(()=>{
        getDetail(props.id);
    },[])
    if(bcDetail===null) {return <MainSpin />}
    return(
        <>
            <Card title="资源详情" style={{margin:10}} headerStyle={{textAlign:'center'}}>
                <div style={{textAlign:"center"}}>
                    <Avatar size={64} shape="circle">
                        <img src={bcDetail.iconaddr} alt="头像"/>
                    </Avatar>
                    <div style={{marginTop:10}}>{bcDetail.title}</div>
                    <div style={{marginTop:10}}>
                        <Tag style={{marginRight:5}} icon={<IconEye />}>{bcDetail.look}</Tag>
                        <Tag style={{marginRight:5}} icon={<IconHeartFill />}>{bcDetail.like}</Tag>
                        <Tag style={{marginRight:5}} icon={<IconEye />}>{bcDetail.look}</Tag>
                    </div>
                    <div style={{marginTop:10}}>{bcDetail.describ}</div>
                    <div style={{marginTop:10}}>{bcDetail.tags.split(',').map((tag)=>(
                        <Tag style={{marginRight:5}} key={tag}>{tag}</Tag>
                    ))}</div>
                </div>
                <Divider />
                <div>
                    <div className="detail-box">
                        <div>链接:</div>
                        <div>
                            <a href={bcDetail.link} target='_blank' style={{textDecorationLine: "none"}}>{bcDetail.link}</a>
                        </div>
                    </div>
                    <div className="detail-box">
                        <div>详情:</div>
                        <div>{bcDetail.detail}</div>
                    </div>
                    <div className="detail-box">
                        <div>时间:</div>
                        <div> <TimeAgo creatTime={bcDetail.CreatedAt}/></div>
                    </div>
                    <div className="detail-box">
                        <div>荐者:</div>
                        <div className="detail-box">
                            <Avatar><img src={bcDetail.avater} alt="头像" /></Avatar>
                            <div style={{fontSize: 18}}>{bcDetail.username}</div>
                        </div>
                    </div>
                </div>
            </Card>
            <Comments commentId={bcDetail.ID}/>
        </>
    )
}
export default BcDetail;