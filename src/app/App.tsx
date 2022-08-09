import React, { useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../common/hooks/hooks';
import { ErrorSnackBar } from '../components/errorSnackbar/ErrorSnackbar';
import { HeaderContainer } from '../components/header/HeaderContainer';
import { NotFound } from '../pages/404/NotFound';
import { Login } from '../pages/login/Login';
import { CardsPage } from '../pages/packsList/cards/CardsPage';
import { EmptyPackPage } from '../pages/packsList/cards/EmptyPackPage';
import { PacksList } from '../pages/packsList/PacksList';
import { PasswordNew } from '../pages/password-new/PasswordNew';
import { PasswordRecovery } from '../pages/password-recovery/PasswordRecovery';
import { ProfileContainer } from '../pages/profile/ProfileContainer';
import { Registration } from '../pages/registration/Registration';

import { initializeApp } from './appReducer';

export const App = (): any => {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(state => state.app.isInitialized);

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '30%',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="app">
      <HeaderContainer />
      {/* для тестого перехода по страницам */}
      <div className="test">
        <NavLink className="navlink" to="/">
          login
        </NavLink>
        <NavLink className="navlink" to="/set-new-password/*">
          password-new
        </NavLink>
        <NavLink className="navlink" to="/password-recovery">
          password-recovery
        </NavLink>
        <NavLink className="navlink" to="/registration">
          registration
        </NavLink>
        <NavLink className="navlink" to="/profile">
          profile
        </NavLink>
        <NavLink className="navlink" to="/packs">
          packs
        </NavLink>
      </div>
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="set-new-password/*" element={<PasswordNew />} />
            <Route path="password-recovery" element={<PasswordRecovery />} />
            <Route path="packs" element={<PacksList />} />
            <Route path="registration" element={<Registration />} />
            <Route path="profile" element={<ProfileContainer />} />
            <Route path="404" element={<NotFound />} />
            <Route path="cardsPage" element={<CardsPage />} />
            <Route path="emptyPackPage" element={<EmptyPackPage />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
          <ErrorSnackBar />
        </div>
      </div>
    </div>
  );
};
