import {  lazy } from "react";
//import AdminNav from '../pages/admin/adminNav';
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
const HareEditor = lazy(()=>import("../pages/home/shareEditor/shareEditor"))
const AllShare = lazy(()=>import("../pages/home/shares/allShare"))
const LatestShare = lazy(()=> import('../pages/home/shares/latestshare'))
const AllAttention = lazy(()=> import('../pages/home/shares/allAttention'))
const SpecialAttention = lazy(()=> import('../pages/home/shares/specialAttention'))
const ShareFriends = lazy(()=> import('../pages/home/shares/ShareFriends'))
const ShareClassHome = lazy(() => import('../pages/home/shareClass/shareClassHome'))
const ShareClassHot = lazy(() => import('../pages/home/shareClass/shareClassHot'))
const OwnerPage = lazy(() => import('../pages/userCenter/pages/ownerPage'))
const OwnerAttention = lazy(() => import('../pages/userCenter/pages/ownerAttention'))
const ShareUser = lazy(() => import('../pages/home/shares/shareUser'))
const router = [
    {
        path:'/',
        element:<Home />,
        children:[
            {
                path:'/share',
                element: <ShareClassHome />,
                children:[
                     {
                        path:'/share/allshare',
                        element: <AllShare />
                    },{
                        path:'/share/latestshare',
                        element: <LatestShare />
                    },{
                        path:'/share/allattention',
                        element: <AllAttention />
                    },{
                        path:'/share/specialattention',
                        element: <SpecialAttention />
                    },{
                        path:'/share/friends',
                        element: <ShareFriends />
                    },{
                        path:'/share/u/:id',
                        element: <ShareUser />
                    }
                ]
            },{
                path:'/hotshare',
                element:<ShareClassHot />
            }
           
        ]
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
        element:<UserCenter />,
        children:[
            {
                path:'/userCenter/ownerpage',
                element: <OwnerPage />
            },{
                path:'/userCenter/ownerattention',
                element: <OwnerAttention />
            }
        ]
    },{
        path:"/editUserInfo",
        element:<UserInfo />
    },{
        path:"/evd",
        element:<Evd />
    },{
        path:"/share/editor",
        element:<HareEditor />
    }
]

export default router;