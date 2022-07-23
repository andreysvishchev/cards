import React from 'react';
import {Profile} from "./Profile";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

const ProfileContainer = () => {
    const dispatch = useAppDispatch();
    const {avatar, name, email, publicCardPacksCount} = useAppSelector(state => state.profile);

    const logout = () => {
        // dispatch(logoutTC());
    }

    return <Profile
        avatar={avatar}
        name={name}
        email={email}
        cardsCount={publicCardPacksCount}
        logout={logout}
    />
};

export default ProfileContainer;