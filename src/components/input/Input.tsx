import React, { ChangeEvent, useState } from 'react';

type PropsType = {
  placeholder: string
  type?: string
  password?: boolean
  error?: any
  errorText?: string
  value?: string | number
  onBlur?: (e: any) => void
  onChange?: (e: React.ChangeEvent<any>) => void
  name?: string
}
const Input: React.FC<PropsType> = ({ placeholder, type, password, error, errorText, value, onBlur, onChange, name }) => {

  const [hidden, setHidden] = useState<boolean>(true)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e)
    }
  }
  const changeType = () => {
    setHidden(!hidden)
  }
  return (
    <>
      {password
        ?
        <div>
          <div className={error ? 'input input--error' : 'input'}>
            <input
              value={value}
              name={name}
              onBlur={onBlur}
              onChange={onChangeHandler}
              autoComplete='on'
              type={hidden ? 'password' : 'text'}
              className='input__field' />
            <label className={value !== '' ? 'input__label input__label--filed ' : 'input__label'}>{error ? errorText : placeholder}</label>
            <span onClick={changeType} className={hidden ? 'input__icon' : 'input__icon input__icon--active'}></span>

          </div>
        </div>
        :
        <div className={error ? 'input input--error' : 'input'}>
          <input
            value={value}
            name={name}
            onBlur={onBlur}
            onChange={onChangeHandler}
            type={type}
            className='input__field'
          />
          <label className={value !== '' ? 'input__label input__label--filed ' : 'input__label'}>{error ? errorText : placeholder}</label>
        </div>
      }
    </>

  );
};

export default Input;
