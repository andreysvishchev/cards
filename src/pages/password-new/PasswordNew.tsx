import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {useFormik} from "formik";
import {useLocation, useNavigate} from "react-router-dom";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import {sendResetPassword} from "./passwordNewReducer";

type FormikErrorType = {
	password?: string
}

const PasswordNew = () => {
	const dispatch = useAppDispatch();
	const status = useAppSelector(state => state.app.status);
	const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
	const isPasswordChanged = useAppSelector(state => state.passwordNew.passwordChanged);
	const [token, setToken] = useState<string>('');
	const location = useLocation();
	const navigate = useNavigate()

	useEffect(() => {
		if (isLoggedIn) navigate('/profile')
		if (isPasswordChanged) navigate('/')
	}, [isLoggedIn, isPasswordChanged]);


	useEffect(() => {
		if(location.pathname) {
			const getToken = location.pathname.split('/').reverse()[0];
			setToken(getToken);
		}
	}, [location.pathname])

	const formik = useFormik({
		initialValues: {
			password: '',
		},
		validate: (values) => {
			const errors: FormikErrorType = {};
			if (!values.password) {
				errors.password = 'Поле обязательно для заполнения';
			}
			return errors;
		},
		onSubmit: values => {
			dispatch(sendResetPassword(values.password, token));
			formik.resetForm();
		},
	})

	return (
		<div className='frame'>
			<div className='title'>Create new password</div>
				<form className="form" onSubmit={formik.handleSubmit}>
					<Input placeholder='Password' password={true} {...formik.getFieldProps('password')}
						   error={formik.errors.password && formik.touched.password}
						   errorText={formik.errors.password}/>
					<div className="passwordRecovery__text">
						Create new password and we will send you further instructions to email
					</div>
					<div style={{marginTop: '36px', display: 'flex', justifyContent: 'center'}}>
						<Button title='Create new password' disabled={status === 'loading'} type='submit'/>
					</div>
				</form>
		</div>
	);
};

export default PasswordNew;
