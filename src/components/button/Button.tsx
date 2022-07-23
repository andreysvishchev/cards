import React from 'react';
import { RequestStatusType } from '../../app/appReducer';
import { useAppSelector } from '../../app/store';

type PropsType = {
  callBack?: () => void
  title: string
  type?: 'button' | 'submit'
  disabled?: boolean
}
const Button: React.FC<PropsType> = ({ callBack, title, type, disabled }) => {


  return (
    <button
      type={type}
      disabled={disabled}
      className='button'
      onClick={callBack}>{title}
    </button>
  );
};

export default Button;
