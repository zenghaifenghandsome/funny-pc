import {Button, Card, Divider, Form, Input, Message} from '@arco-design/web-react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api_register } from '../../tools/ajax';
import './register.less';
const Register = () =>{

    const usernameRef = useRef<any>();
    const passwordRef = useRef<any>();
    const phoneRef = useRef<any>();
    const emailRef = useRef<any>();

    const route = useNavigate();

   const regist = async(userInfo:any) =>{

    let result:any = await api_register(userInfo)
            console.log(result)
        if(result.status===200){
            Message.success("注册成功！")
            route("/login")
        }


   }
    const doRegister =  () =>{
        let userInfo={
            username:usernameRef.current.dom.value,
            password:passwordRef.current.dom.value,
            phone:phoneRef.current.dom.value,
            email:emailRef.current.dom.value,
            role:"1",
        }
        regist(userInfo)
       
    }
    return(
        <div className='register-box'>
            <Card className='register-card' bodyStyle={{display:'grid',gridTemplateColumns:'500px 5px auto',padding:0}} >
                <div>
                    <img style={{marginTop:100}}  src="http://qiniu.zzhh.asia/loginPic.svg" alt="pic" />
                </div>
                <Divider type='vertical' style={{height:600}} />
                <div style={{padding:'0 30px'}}>
                    <div style={{marginTop:100,fontSize:30,fontWeight:'bolder',marginLeft:180}}>注册</div>
                    <Form style={{marginTop:30}}>
                        <Form.Item rules={[{required:true}]} label="用户名">
                            <Input  ref={usernameRef}/>
                        </Form.Item>
                        <Form.Item required label="密码">
                            <Input.Password ref={passwordRef}/>
                        </Form.Item>
                        <Form.Item required label="确认密码">
                            <Input.Password />
                        </Form.Item>
                        <Form.Item required label="手机号码">
                            <Input ref={phoneRef}/>
                        </Form.Item>
                        <Form.Item required label="邮箱">
                            <Input  ref={emailRef}/>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset:6}}>
                            <Button type='primary' style={{marginRight:100,width:100,height:40}}>取消</Button>
                            <Button type='primary' onClick={doRegister} style={{width:100,height:40}}>注册</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
        </div>
    )
}
export default Register;