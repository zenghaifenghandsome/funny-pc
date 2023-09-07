import {Button, Card, Input} from '@arco-design/web-react';
import { IconLeft } from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';
const ShareEditor = () => {
    const nav = useNavigate()
    const cancel = () => {
        nav(-1)
    }
    return (
        <>
            <Card>
                <IconLeft onClick={cancel}/>
                <Button type='primary' style={{marginLeft:'80%',right:10}}>发送</Button>
            </Card>
            <Card style={{height:'90%'}}>
                <Input placeholder='分享新鲜事···' />

            </Card>
        </>
    )
}
export default ShareEditor;