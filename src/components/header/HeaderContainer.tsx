import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../common/hooks/hooks';
import { ReturnComponentType } from '../../common/types/ReturnComponentsType';

import { Header } from './Header';

const HeaderContainer = (): ReturnComponentType => {
  const isAuth = useAppSelector(state => state.login.isLoggedIn);
  const { name, avatar } = useAppSelector(state => state.profile);
  const navigate = useNavigate();
  const navToSignIn = (): void => navigate('/');

  return (
    <Header navToSignIn={navToSignIn} avatar={avatar} userName={name} isAuth={isAuth} />
  );
};

export default HeaderContainer;
