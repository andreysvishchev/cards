import React from 'react';
import {Header} from "./Header";
import {useAppSelector} from "../../hooks/hooks";
import {useNavigate} from "react-router-dom";

const HeaderContainer = () => {

    const isAuth = useAppSelector(state => state.login.isLoggedIn);
    const {name, avatar} = useAppSelector(state => state.profile);
    const navigate = useNavigate();
    const navToSignIn = () => navigate('/');

    return <Header navToSignIn={navToSignIn} avatar={avatar} userName={name} isAuth={isAuth}/>
};

export default HeaderContainer;