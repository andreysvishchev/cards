import React from 'react';
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

const Test = () => {
    return (
        <div className='test'>
            <Button title={'Кнопка'}/>
            <Input placeholder={'Email'}/>
        </div>
    );
};

export default Test;