import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {useFormik} from "formik";
import {sendRegistrationData} from "../registration/registrationReducer";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import {Navigate, NavLink} from "react-router-dom";
import {sendLoginData} from "./loginReducer";

type FormikErrorType = {
	email?: string
	password?: string,
	rememberMe?: boolean
}

const Login = () => {

	const dispatch = useAppDispatch()
	const status = useAppSelector(state => state.app.status)
	const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			rememberMe: false
		},
		validate: (values) => {
			const errors: FormikErrorType = {};
			if (!values.email) {
				errors.email = 'Поле обязательно для заполнения';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'Email указан некорректно';
			}
			if (!values.password) {
				errors.password = 'Поле обязательно для заполнения';
			}
			return errors;
		},
		onSubmit: values => {
			console.log(values)
			const data = {
				email: values.email,
				password: values.password,
				rememberMe: values.rememberMe
			}
			dispatch(sendLoginData(data))
			formik.resetForm()
		},
	})

	if (isLoggedIn) {
		debugger
		return <Navigate to="/profile"/>
	}

  return (
    <div className='frame'>
      <div className='title'>Sign in</div>
		<form className="form" onSubmit={formik.handleSubmit}>
			<Input placeholder='Email'
				   {...formik.getFieldProps('email')}
				   error={formik.errors.email && formik.touched.email}
				   errorText={formik.errors.email}/>
			<Input placeholder='Password' password={true} {...formik.getFieldProps('password')}
				   error={formik.errors.password && formik.touched.password}
				   errorText={formik.errors.password}/>
			{/*Заглушка*/}
			<label htmlFor="checkbox">Remember Me</label>
			<input type='checkbox' placeholder='RememberMe' {...formik.getFieldProps('rememberMe')}/>
			{/*Заглушка*/}
			<NavLink className={'login__forgotLink'}
					 to="/password-recovery">Forgot Password</NavLink>
			<div style={{marginTop: '36px', display: 'flex', justifyContent: 'center'}}>
				<Button title='Sign in' disabled={status === 'loading'} type='submit'/>
			</div>
		</form>
		<div className="registration__text">
			'Don’t have an account?'
		</div>
		<NavLink className={'registration__link'}
				 to="/registration">Sign Up</NavLink>
    </div>
  );
};

export default Login;
