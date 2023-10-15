import {Empty, Spin} from '@arco-design/web-react';
import { FC, useEffect, useState } from 'react';
import './mainSpin.less';
const MainSpin = () =>{
    const [status,setStatus] = useState(false);
    useEffect(()=>{
        setTimeout(() => {
            setStatus(true)
        }, 10000);
    })
    return status? <Empty />:(
        <>
            <div style={{width:'100%',height:'100%'}}>
                <Spin size={50} dot className="spin"/>
            </div>
        </>
    )
}
export default MainSpin;