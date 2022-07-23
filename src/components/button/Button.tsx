import React from 'react';

type PropsType = {
  callBack?: () => void
  title: string
  disabled?: boolean
  type?: 'button' | 'submit'

}
const Button: React.FC<PropsType> = ({ callBack, title, disabled, type }) => {

  return (
    <button type={type} className='button' onClick={callBack} disabled={disabled}>{title}</button>
  );
};

export default Button;
