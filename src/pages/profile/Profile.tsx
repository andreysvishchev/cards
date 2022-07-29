import React from 'react';
import Button from "../../components/button/Button";
import {EditableSpan} from "../../components/editableSpan/EditableSpan";
import {useAppSelector} from "../../hooks/hooks";
import default_avatar from '../../img/avatar.png'

export const Profile = React.memo((props: ProfilePropsType) => {

    const {name, avatar, cardsCount, email, logout, editField} = props;
    const status = useAppSelector(state => state.app.status)
    const logoutHandler = () => logout();
    const editFieldHandler = (newTitle: string) => editField(newTitle);

    return (
        <div className={"frame"}>
            <div className={"profile"}>
                <div className={"title"}>
                    Personal Information
                </div>
                <div className={"profile__avatar"}>
                    {avatar ?
                        <img src={avatar} alt="avatar"/>
                        :
                        <img src={default_avatar} alt="avatar"/>
                    }

                </div>
                <div className={"profile__name"}>
                    <h4><EditableSpan name={name} callback={editFieldHandler}/></h4>
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
                        disabled={status === 'loading'}
                        callBack={logoutHandler}
                    />
                </div>
            </div>
        </div>
    );
});

type ProfilePropsType = {
    editField: (newTitle: string) => void
    avatar: string
    name: string
    email: string
    cardsCount: number
    logout: () => void
}