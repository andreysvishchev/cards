import React, { ChangeEvent, useState } from 'react';

type PropsType = {
  placeholder: string
  type?: string
  password?: boolean
}
const Input: React.FC<PropsType> = ({ placeholder, type, password }) => {

  const [value, setValue] = useState<string>('')
  const [hidden, setHidden] = useState<boolean>(true)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }
  const changeType = () => {
    setHidden(!hidden)
  }
  return (
    <>
      {password
        ?
        <div>
          <div className='input'>
            <input autoComplete='on' onChange={onChangeHandler} type={hidden ? 'password' : 'text'} className='input__field' value={value} />
            <label className={value !== '' ? 'input__label input__label--filed ' : 'input__label'}>{placeholder}</label>
            <span onClick={changeType} className={hidden ? 'input__icon' : 'input__icon input__icon--active'}></span>
          </div>
        </div>
        :
        <div className='input'>
          <input onChange={onChangeHandler} type={type} className='input__field' value={value} />
          <label className={value !== '' ? 'input__label input__label--filed ' : 'input__label'}>{placeholder}</label>
        </div>
      }
    </>

  );
};

export default Input;
