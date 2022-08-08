import React from 'react';

import logo from '../../assets/img/logo.svg';
import { Button } from '../button/Button';

export const Header: React.FC<HeaderPropsType> = props => {
  const { isAuth, userName, avatar, navToSignIn } = props;

  return (
    <header className="header">
      <div className="container container--header">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        {isAuth ? (
          <div className="user-data">
            <div className="user-data__name">{userName}</div>
            <div className="user-data__avatar">
              <img src={avatar} alt="" />
            </div>
          </div>
        ) : (
          <Button submit={false} callBack={navToSignIn} title="Sign in" />
        )}
      </div>
    </header>
  );
};

type HeaderPropsType = {
  navToSignIn: () => void;
  isAuth: boolean;
  userName: string;
  avatar: string;
};
