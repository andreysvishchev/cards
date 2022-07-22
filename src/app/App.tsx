import React from 'react';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Test from "../pages/test/Test";
import Login from "../pages/login/Login";
import PassportNew from "../pages/password-new/PassportNew";
import PasswordRecovery from "../pages/password-recovery/PasswordRecovery";
import Registration from "../pages/registration/Registration";
import Profile from "../pages/profile/Profile";
import NoteFound from "../pages/404/NotFound";
import Button from '../components/button/Button';
import { Header } from '../components/header/Header';
import Cards from '../pages/cards/Cards';

function App() {
  return (
    <div className='app'>
      <Header />
      {/* для тестого перехода по страницам */}
      <div className="test">
        <NavLink className='navlink' to="/">login</NavLink>
        <NavLink className='navlink' to="/password-new">password-new</NavLink>
        <NavLink className='navlink' to="/password-recovery">password-recovery</NavLink>
        <NavLink className='navlink' to="/registration">registration</NavLink>
        <NavLink className='navlink' to="/profile">profile</NavLink>
        <NavLink className='navlink' to="/cards">cards</NavLink>
        <NavLink className='navlink' to="/test">test</NavLink>
      </div>
      <div className="content">
        <div className="container">
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/password-new' element={<PassportNew />} />
            <Route path='/password-recovery' element={<PasswordRecovery />} />
            <Route path='/cards' element={<Cards />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/test' element={<Test />} />
            <Route path="/404" element={<NoteFound />} />
            <Route path="*" element={<Navigate to='/404' />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
