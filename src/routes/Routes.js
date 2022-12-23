import About from "../pages/About";
import Post from "../pages/Post";
import PostPage from "../components/PostPage";
import Login from "../components/Login";


export const privateRoutes = [
    {path: "/about", element: <About/>},
    {path: "/posts", element: <Post/>},
    {path: "/posts/:id", element: <PostPage/>}
]

export const publicRoutes = [
    {path: "/login", element: <Login/>}
]