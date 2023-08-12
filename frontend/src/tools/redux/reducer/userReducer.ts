import {createSlice} from '@reduxjs/toolkit'
import { getUser } from '../../localstore'
const userReducer = createSlice({
    name:'user',
    initialState:{
        value:getUser(),
    },
    reducers:{
        updata:(state)=>{
            state.value=getUser()
        },
    }
})
export const {updata} = userReducer.actions;
export default userReducer.reducer;