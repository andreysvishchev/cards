import React from 'react';

type PropsType = {
    callBack?: () => void
    title: string
    type?: 'button' | 'submit'
    disabled?: boolean
}
const Button = React.memo((props: PropsType) => {

    const {callBack, title, type, disabled} = props;

    return (
        <button
            type={type}
            disabled={disabled}
            className='button'
            onClick={callBack}>{title}
        </button>
    );
});

export default Button;