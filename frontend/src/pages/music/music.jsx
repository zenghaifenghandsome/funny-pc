import MainSpin from "../../component/mainSpin/mainSpin"
import {Carousel} from '@arco-design/web-react';
import { useEffect, useState } from "react";
//import { api_getMusicBanner } from "../../tools/ajax";
const Music = () =>{
    const [recommentMusic,setRecommentMusic] = useState([])
    const [bannerHeight,setBannerHeight] = useState(0)
    useEffect(()=>{
        setBannerHeight(3/16*window.innerWidth)
        window.onresize = () =>{
            setBannerHeight(3/16*window.innerWidth)
        }
       
    },[])
    return(
        <>
            <div>
                <div>
                    <Carousel autoPlay animation="card" style={{width:'100%',height:bannerHeight}}>
                        {recommentMusic.map((src,index)=>(
                            <div key={index} style={{width:'60%'}}>
                                <img src={src.imageUrl} style={{width:'100%'}}/>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </>
    )
}
export default Music