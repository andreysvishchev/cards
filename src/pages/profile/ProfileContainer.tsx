import React, {useEffect} from 'react';
import {Profile} from "./Profile";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {logoutTC} from "../login/loginReducer";
import {useNavigate} from "react-router-dom";

const ProfileContainer = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {avatar, name, email, publicCardPacksCount} = useAppSelector(state => state.profile);
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

    const logout = () => {
        dispatch(logoutTC());
    }

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        }
    });

    return <Profile
        avatar={avatar}
        name={name}
        email={email}
        cardsCount={publicCardPacksCount}
        logout={logout}
    />
};

export default ProfileContainer;