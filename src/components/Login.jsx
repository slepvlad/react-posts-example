import React, {useContext} from 'react';
import MyInput from "./ui/input/MyInput";
import MyButton from "./ui/button/MyButton";
import {AuthContext} from "../context/Context";

const Login = () => {
    const {setIsAuth} = useContext(AuthContext)
    const login = (e) => {
        e.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h1>Login page</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Input login"/>
                <MyInput type="password" placeholder="Input password"/>
                <MyButton>Sign in</MyButton>
            </form>
        </div>
    );
};

export default Login;