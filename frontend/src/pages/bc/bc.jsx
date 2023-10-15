import { Card, Tag,Divider,Typography,Empty } from "@arco-design/web-react";
import {IconHeartFill,IconHeart,IconMessage,IconLink} from "@arco-design/web-react/icon"
import { useEffect, useState } from "react";
import { api_getAllOkBc } from "../../tools/ajax";
import {Link} from 'react-router-dom';
import './bc.less';

const Bc = () =>{
    const [bcs,setBcs] = useState([])

    const getAllOkBc = async() =>{
        let result = await api_getAllOkBc()
        setBcs(result.data)
    }
    useEffect(()=>{
        getAllOkBc()
    },[])
    if(bcs.length<=0){
        return <Empty />
    }
    return(
        <>
            <div className="bcCards">{bcs.map((bc)=>(
                <Card key={bc.ID} className="bcCard" hoverable bodyStyle={{padding:0}} style={{borderRadius:'10px'}}> 
                    <Link to={`/bc/detail/${bc.ID}`} style={{color:'var(--color-neutral-8)',textDecorationLine:'none'}}>
                        <div className="card-headers">
                            <div style={{width:'80px',height:'80px',lineHeight:'80px'}}>
                                <img src={bc.iconaddr} alt="img" className='bc-icon'/>
                            </div>
                            <div style={{marginLeft:10}}>
                                <div className="bc-link-title">{bc.title}</div>
                                <div style={{marginTop:10}} className='bc-describ'>
                                    <Typography.Text ellipsis={{rows:2}}>
                                        {bc.describ}
                                    </Typography.Text>
                                        
                                </div>
                            </div>
                        </div>
                        <div>
                            {bc.tags.split(',').map((tag)=>(<Tag key={tag} style={{marginLeft:'5px'}}>{tag}</Tag>))}
                        </div>
                    </Link>
                    <Divider className="divider" style={{margin:0}}/>
                    <div className="bc-foot">
                        <div>
                            <div style={{display:'flex'}}>
                                <div>{bc.like===0?<IconHeart fontSize={25}/>:<IconHeartFill fontSize={25}/>}</div>
                                <div>{bc.like===0?"":bc.like}</div>
                            </div>
                        </div>
                        <Divider type="vertical" style={{height:20}}/>
                        <div><IconMessage fontSize={25}/></div>
                        <Divider type="vertical" style={{height:20}}/>
                        <div><IconLink fontSize={25}/></div>
                    </div>
                </Card>
            ))}</div>
        </>
    )
}
export default Bc;