import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context/Context";

const Navbar = () => {

    const {setIsAuth} = useContext(AuthContext)

    const logout = () => {
        setIsAuth(false)
        localStorage.setItem('auth', 'false')
    }

    return (
        <div className={'navbar'}>
            <MyButton onClick={logout}>Logout</MyButton>
            <div className={'navbar__lines'}>
                <Link to={"/about"}>About</Link>
                <Link to={"/posts"}>Posts</Link>
            </div>
        </div>
    );
};

export default Navbar;