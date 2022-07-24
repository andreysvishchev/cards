import Button from "../button/Button"
import logo from '../../img/logo.svg'
import React from "react";


export const Header: React.FC<HeaderPropsType> = (props) => {

    const {isAuth, userName, avatar} = props

    return (
        <header className="header">
            <div className="container container--header">
                <a href="#" className="logo">
                    <img src={logo} alt="Logo"/>
                </a>
                {isAuth
                    ? <div className={'user-data'}>
                        <div className={'user-data__name'}>
                            {userName}
                        </div>
                        <div className={'user-data__avatar'}>
                            <img src={avatar} alt=""/>
                        </div>
                    </div>
                    : <Button title='Sign in'/>
                }
            </div>
        </header>
    )
}


type HeaderPropsType = {
    isAuth: boolean
    userName: string
    avatar: string
}
