import React from 'react';

type PropsType = {
  callBack?: () => void;
  title: string;
  submit: boolean;
  disabled?: boolean;
};
const Button = React.memo((props: PropsType) => {
  const { callBack, title, disabled, submit } = props;

  return (
    <button
      type={submit ? 'submit' : 'button'}
      disabled={disabled}
      className="button"
      onClick={callBack}
    >
      {title}
    </button>
  );
});

export default Button;
