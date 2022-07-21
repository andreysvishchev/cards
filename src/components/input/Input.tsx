import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    placeholder: string
    type?: string
}
const Input: React.FC<PropsType> = ({placeholder, type}) => {

    const [value, setValue] = useState<string>('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    return (
        <div className='input'>
            <input onChange={onChangeHandler} type={type} className='input__field' value={value}/>
            <label className={value !== '' ?'input__label input__label--filed '  :'input__label'}>{placeholder}</label>
        </div>
    );
};

export default Input;