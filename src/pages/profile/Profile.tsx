import React from 'react';
import Button from "../../components/button/Button";

export const Profile = React.memo((props: ProfilePropsType) => {

    const {name, avatar, cardsCount, email, logout} = props;

    const logoutHandler = () => logout();

    return (
        <div className={"frame"}>
            <div className={"profile"}>
                <div className={"title"}>
                    Personal Information
                </div>
                <div className={"profile__avatar"}>
                    <img src={avatar} alt="avatar"/>
                </div>
                <div className={"profile__name"}>
                    <h3>{name}</h3>
                </div>
                <div className={"profile__email"}>
                    <h4>{email}</h4>
                </div>
                <div className={"profile__cards-count"}>
                    <h4>{cardsCount}</h4>
                </div>
                <div className={"profile__button"}>
                    <Button
                        title={"logout"}
                        type={"button"}
                        disabled={false}
                        callBack={logoutHandler}
                    />
                </div>
            </div>
        </div>
    );
});

type ProfilePropsType = {
    avatar: string
    name: string
    email: string
    cardsCount: number
    logout: () => void
}