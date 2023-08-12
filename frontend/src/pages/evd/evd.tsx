import { FC, useEffect, useState } from "react";
import EvdBody from "../../component/evd/evdBody";
import { api_evd_getAllEvd } from "../../tools/ajax";




const Evd:FC = () =>{
    const [evdList,setEvdList] = useState<Array<any>>([]);
    
    const getAllEvd = async()=>{
        let result:any= await api_evd_getAllEvd();
        console.log(result)
        setEvdList(result.data);
    }
    
    useEffect(()=>{
        getAllEvd();

    },[])
    return(
        <>
            <div className="evd-main">{evdList.map((evd)=>(
                <EvdBody key={evd.ID} id={evd.ID} userid={evd.userid}/>
            ))}</div>
        </>
    )
}
export default Evd;