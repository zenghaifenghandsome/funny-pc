import { useEffect, useState } from "react"
import { api_getAllShare } from "../../../tools/ajax"
import { Empty } from "@arco-design/web-react"
import MainShare from "../../../component/share/mainShare"

const SpecialAttention = () => {
    const [share,setShare] = useState([])

    const getAllShare = async() =>{
        let result = await api_getAllShare()
        //console.log(result)
        setShare(result.data)
       // console.log(share)
    }
    useEffect(()=>{
        getAllShare()
    },[])
    
    return(
        <>
            <div>
                {share.length > 0 ? share.map((s)=> 
                <MainShare 
                key={s.ID}
                id={s.ID} 
                userid={s.userid} 
                content={s.content}
                piclist={s.piclist.length>0?s.piclist.split(','):null}
                />):<Empty />}
            </div>
        </>
    )
}
export default SpecialAttention;