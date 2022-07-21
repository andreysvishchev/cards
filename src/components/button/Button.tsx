import React from 'react';

type PropsType = {
    callBack?: () => void
    title: string
    disabled?: boolean
}
const Button: React.FC<PropsType> = ({callBack, title, disabled}) => {

    return (
        <button className='button' onClick={callBack} disabled={disabled}>{title}</button>
    );
};

export default Button;