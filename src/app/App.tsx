import React, {useEffect} from 'react';
import {Navigate, NavLink, Route, Routes} from 'react-router-dom';
import Test from "../pages/test/Test";
import Login from "../pages/login/Login";
import PassportNew from "../pages/password-new/PassportNew";
import PasswordRecovery from "../pages/password-recovery/PasswordRecovery";
import Registration from "../pages/registration/Registration";
import NoteFound from "../pages/404/NotFound";
import Cards from '../pages/cards/Cards';
import ProfileContainer from "../pages/profile/ProfileContainer";
import HeaderContainer from "../components/header/HeaderContainer";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {initializeApp} from "./appReducer";

const App = () => {
    const dispatch = useAppDispatch();
    const isInitialized = useAppSelector(state => state.app.isInitialized);
    useEffect(() => {
        dispatch(initializeApp());
    }, []);

    if (!isInitialized) {
        //заглушка
        return <div>UUU</div>
    }

    return (
        <div className='app'>
            <HeaderContainer/>
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
                        <Route path='/' element={<Login/>}/>
                        <Route path='/password-new' element={<PassportNew/>}/>
                        <Route path='/password-recovery' element={<PasswordRecovery/>}/>
                        <Route path='/cards' element={<Cards/>}/>
                        <Route path='/registration' element={<Registration/>}/>
                        <Route path='/profile' element={<ProfileContainer/>}/>
                        <Route path='/test' element={<Test/>}/>
                        <Route path="/404" element={<NoteFound/>}/>
                        <Route path="*" element={<Navigate to='/404'/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;