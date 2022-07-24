import React from 'react';
import {Header} from "./Header";
import {useAppSelector} from "../../hooks/hooks";

const HeaderContainer = () => {

    const isAuth = useAppSelector(state => state.login.isAuth);
    const {name, avatar} = useAppSelector(state => state.profile);

    return <Header avatar={avatar} userName={name} isAuth={isAuth}/>
};

export default HeaderContainer;