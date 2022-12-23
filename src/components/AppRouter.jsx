import React from 'react';
import {Route, Routes} from "react-router-dom";
import About from "../pages/About";
import Post from "../pages/Post";
import Error from "../pages/Error";
import PostPage from "./PostPage";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/about" element={<About/>}/>
            <Route path="/posts" element={<Post/>}/>
            <Route path="/posts/:id" element={<PostPage/>}/>
            <Route path="/error" element={<Error/>}/>
            <Route path="*" element={<Error/>}/>
        </Routes>
    );
};

export default AppRouter;