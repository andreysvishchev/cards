import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { logoutTC } from '../login/loginReducer';

import { Profile } from './Profile';
import { updateUserInfo } from './profileReducer';

export const ProfileContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { avatar, name, email, publicCardPacksCount } = useAppSelector(
    state => state.profile,
  );
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

  const logout = (): void => dispatch(logoutTC());
  const editFieldHandler = (newTitle: string): void => dispatch(updateUserInfo(newTitle));

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/cards');
    }
  }, [isLoggedIn]);

  return (
    <Profile
      editField={editFieldHandler}
      avatar={avatar}
      name={name}
      email={email}
      cardsCount={publicCardPacksCount}
      logout={logout}
    />
  );
};
