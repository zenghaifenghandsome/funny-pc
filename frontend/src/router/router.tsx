import {RouteObject, Routes} from 'react-router-dom'
import { Children, lazy } from "react";
import AdminNav from '../pages/admin/adminNav';
import AdminBC from '../pages/admin/pages/adminBC';
import AdminBlog from '../pages/admin/pages/adminBlog';

const Home = lazy(()=>import("../pages/home/home"))
const Bc = lazy(()=> import("../pages/bc/bc"))
const BcDetail = lazy(()=> import("../pages/bc/bcDetail/bcDetail"))
const Music = lazy(()=> import("../pages/music/music"))
const Blog = lazy(()=> import('../pages/blog/blog'))
const BlogShow = lazy(()=> import('../pages/blog/blogshow/blogshow'))
const AddBlog = lazy(()=> import('../pages/blog/addBlog/addBlog'))
const Login = lazy(()=> import('../pages/login/login'))
const Money = lazy(()=> import('../pages/money/money'))
const Todo = lazy(()=> import('../pages/todo/todo'))
const Admin = lazy(()=>import('../pages/admin/admin'))
const Register = lazy(()=> import('../pages/register/register'))
const UserCenter = lazy(()=>import('../pages/userCenter/userCenter'))
const UserInfo = lazy(()=>import("../pages/userCenter/userinfo/userinfo"))
const Evd = lazy(()=>import("../pages/evd/evd"))

const router:RouteObject[] = [
    {
        path:'/',
        element:<Home />,
    },{
        path:'/bc',
        element:<Bc />,
    },{
        path:'/bc/detail/:id',
        element:<BcDetail />
    },{
        path:'/music',
        element:<Music />
    },{
        path:'/blog',
        element:<Blog />
    },{
        path:'/blog/article/:id',
        element:<BlogShow />
    },{
        path:'/blog/addBlog',
        element:<AddBlog />
    },{
        path:'/login',
        element:<Login />
    },{
        path:'/money',
        element:<Money />
    },{
        path:'/todo',
        element:<Todo />
    },{
        path:'/admin',
        element:<Admin />,
        children:[
            {
                path:"/admin/biancheng",
                element:<AdminBC />
            },{
                path:"/admin/blog",
                element:<AdminBlog />
            }

        ]
    },{
        path:"/register",
        element:<Register />
    },{
        path:"/userCenter",
        element:<UserCenter />
    },{
        path:"/editUserInfo",
        element:<UserInfo />
    },{
        path:"/evd",
        element:<Evd />
    }
]

export default router;