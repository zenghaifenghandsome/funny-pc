import store from 'storejs'
import { api_getUserInfo } from './ajax'

export const saveUser = (user) =>{
    store.set({user:user})
}
export const getUser = () => store.get("user")
export const removeUser = () => store.remove("user")



export const userUpdata = async () =>{
    let newUser = store.get("user")
    let result = await api_getUserInfo(newUser.userid)
    console.log(result)
    newUser.avator = result.data.avater;
    saveUser(newUser);
    // api_getUserInfo(newUser.userid).then((req:any)=>{
    //     newUser.avator=req.data.userinfo.avater
    //     saveUser(newUser)
    // }).catch((err:any)=>{console.log(err)})
}