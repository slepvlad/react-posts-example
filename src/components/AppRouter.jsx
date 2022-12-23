import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../routes/Routes"
import {AuthContext} from "../context/Context";
import MyLoader from "./ui/loader/MyLoader";

const AppRouter = () => {
    const {isAuth, setIsAuth, isLoading} = useContext(AuthContext)
    console.log(isAuth)
    if (isLoading) {
        return <MyLoader/>
    }
    return (isAuth ?
        <Routes>
            {privateRoutes.map(route =>
            <Route
                key = {route.path}
                path={route.path}
                element={route.element}
            />
            )}
            <Route path={"*"} element={<Navigate to="posts"/>}/>
        </Routes>
        : <Routes>
            {publicRoutes.map(route =>
            <Route
                key = {route.path}
                path={route.path}
                element={route.element}
            />)}
            <Route path={"*"} element={<Navigate to="login"/>}/>
        </Routes>

)
    ;
};

export default AppRouter;