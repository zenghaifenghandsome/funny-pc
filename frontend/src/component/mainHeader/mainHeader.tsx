import { Button} from "@arco-design/web-react";
import { useState } from "react";
import './mainHeader.less'

const MainHeader = () =>{
    const [winState,setWinState] = useState<boolean>(false)
   // const [misdown,setMisdown] = useState<boolean>(false)
   // const [mx,setMx] = useState(0)
    //const [my,setMy] = useState(0)
    //const [owx,setOwx] = useState(0)
    //const [owy,setOwy] = useState(0)
    const quitApp = () =>{
        (window as any).go.main.App.CloseWind()
    }
    const maxWind = (state:boolean)=>{
       
        (window as any).go.main.App.MaxWind()
      
    }
    const minWind = () =>{
        (window as any).go.main.App.MinWind()
    }
    
    // const windMove = (event:any)=>{
    //     (window as any).go.main.App.GetWindPosition().then((req:any)=>{
    //         setMisdown(true)
    //         let x = event.screenX
    //         let y = event.screenY
    //         //console.log(req)
    //         setOwx(req.X)
    //         setOwy(req.Y)
    //         setMx(x)
    //         setMy(y)
    //     }).catch((err:any)=>{console.log(err)})
        
    // }
    // const mup = () =>{
    //     setMisdown(false)
    //     setMx(0)
    //     setMy(0)
    // }
    // const setwind = (event:any) =>{
    //     if(misdown){
    //         let x:any = event.screenX;
    //         let y:any = event.screenY;
    //         //console.log(x,y);
    //         (window as any).go.main.App.SetWinPosition({X:owx+x-mx,Y:owy+y-my,})

    //     }else{
    //         return
    //     }
    // }
    // const cancelMoveWindows = () =>{
    //     setWinState(false);
    //     setMisdown(false);
    // }
    //onMouseDown={windMove} onMouseMove={setwind}  onMouseUp={mup} onMouseOut={cancelMoveWindows}
    return(
        <div className="main-header">
            <div className="main-header"  > 
                <div className="main-header-buttonGroup">
                    <Button status="warning" shape="circle" type="primary" onClick={minWind} style={{marginRight:'5px'}}>-</Button>
                    <Button status="success" shape="circle" type="primary" onClick={e=>maxWind(winState)} style={{marginRight:'5px'}}>+</Button>
                    <Button status="danger" shape="circle" type="primary" onClick={quitApp} style={{marginRight:'5px'}}>x</Button>
                </div>
            </div>
        </div>
    )
}
export default MainHeader;