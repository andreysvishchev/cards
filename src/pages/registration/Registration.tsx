import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, NavLink } from 'react-router-dom';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';

interface formFields {
  email: string
  password: string
  confirmPassword: string
}

const Registration = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<formFields>();
  const onSubmit: SubmitHandler<formFields> = (data) => {
    console.log(data);

  }
  return (
    <div className='frame'>
      <div className='title'>Sign Up</div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder='Email' {...register("email", {})} />
        <div>
          {errors?.email && <p>{errors?.email.message}</p>}
        </div>
        <Input placeholder='Password' password={true} />
        <Input placeholder='Confirm password' password={true} />
        <div style={{ marginTop: '36px', display: 'flex', justifyContent: 'center' }}>
          <Button title='Sign Up ' type='submit' />
        </div>

      </form>
      <div className="form__text">
        Don’t have an account?
      </div>
      <NavLink className='form__link' to="/">Sign In</NavLink>
    </div>
  );
};

export default Registration;
