import React from 'react';
import {Navigate, NavLink, Route, Routes} from 'react-router-dom';
import Test from "../pages/test/Test";
import Login from "../pages/login/Login";
import PassportNew from "../pages/password-new/PassportNew";
import PasswordRecovery from "../pages/password-recovery/PasswordRecovery";
import Registration from "../pages/registration/Registration";
import Profile from "../pages/profile/Profile";
import NoteFound from "../pages/404/NotFound";

function App() {
    return (
        <div className='app'>
            <header className="header">
                <NavLink to="/login">login</NavLink>
                <NavLink to="/password-new">password-new</NavLink>
                <NavLink to="/password-recovery">password-recovery</NavLink>
                <NavLink to="/registration">registration</NavLink>
                <NavLink to="/profile">profile</NavLink>
                <NavLink to="/test">test</NavLink>
            </header>
            <div className="content">
                <Routes>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/password-new' element={<PassportNew/>}/>
                    <Route path='/password-recovery' element={<PasswordRecovery/>}/>
                    <Route path='/registration' element={<Registration/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/test' element={<Test/>}/>
                    <Route path="/404" element={<NoteFound/>}/>
                    <Route path="*" element={<Navigate to='/404'/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
