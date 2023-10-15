import { Button} from "@arco-design/web-react";
import { useState } from "react";
import './mainHeader.less'

const MainHeader = () =>{
    const [winState,setWinState] = useState(false)
  
    const quitApp = () =>{
        window.go.main.App.CloseWind()
    }
    const maxWind = (state)=>{
       
        window.go.main.App.MaxWind()
      
    }
    const minWind = () =>{
        window.go.main.App.MinWind()
    }

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