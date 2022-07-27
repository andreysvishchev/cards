import {useFormik} from 'formik';
import {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import {sendRegistrationData} from './registrationReducer';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

type FormikErrorType = {
    email?: string
    password?: string
    confirm_password?: string
}

const Registration = () => {

    const send = useAppSelector(state => state.registration.send)
    const dispatch = useAppDispatch()
    const [messageEmail, setMessageEmail] = useState<string>('example@mail.com')
    const status = useAppSelector(state => state.app.status)
	const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
	const navigate = useNavigate()

	useEffect(() => {
		if (isLoggedIn) {
			navigate('/profile')
		}
	}, [isLoggedIn]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirm_password: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Поле обязательно для заполнения';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Email указан некорректно';
            }
            if (values.password !== values.confirm_password) {
                errors.confirm_password = 'Пароли должны совпадать'
            }
            if (!values.password) {
                errors.password = 'Поле обязательно для заполнения';
            }
            if (!values.confirm_password) {
                errors.confirm_password = 'Поле обязательно для заполнения';
            }
            return errors;
        },
        onSubmit: values => {
            const data = {
                email: values.email,
                password: values.password
            }
            dispatch(sendRegistrationData(data))
            setMessageEmail(values.email)
            formik.resetForm()
        },
    })

    return (
        <div className='frame'>
            <div className='title'>{send ? 'Check Email' : 'Sign Up'}</div>
            {send ?
                <div className='registration'>
                    <div className='registration__img'></div>
                </div>
                :
                <form className="form" onSubmit={formik.handleSubmit}>
                    <Input placeholder='Email'
                           {...formik.getFieldProps('email')}
                           error={formik.errors.email && formik.touched.email}
                           errorText={formik.errors.email}/>
                    <Input placeholder='Password' password={true} {...formik.getFieldProps('password')}
                           error={formik.errors.password && formik.touched.password}
                           errorText={formik.errors.password}/>
                    <Input placeholder='Confirm password' password={true} {...formik.getFieldProps('confirm_password')}
                           error={formik.errors.confirm_password && formik.touched.confirm_password}
                           errorText={formik.errors.confirm_password}/>
                    <div style={{marginTop: '36px', display: 'flex', justifyContent: 'center'}}>
                        <Button title='Sign Up' disabled={status === 'loading'} type='submit'/>
                    </div>
                </form>
            }
            <div className="registration__text">
                {send ? `We’ve sent an Email with instructions to ${messageEmail}` : 'Don’t have an account?'}
            </div>
            <NavLink className={send ? 'button button--registration' : 'registration__link'}
                     to="/">{send ? 'Back to login' : 'Sign In'}</NavLink>
        </div>
    );
};

export default Registration;