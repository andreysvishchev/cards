import React, {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch} from "../../hooks/hooks";
import {getPacksByTitle} from "../../pages/cards/cardsReducer";
import {useDebounce} from "../../hooks/useDebounce";

const Search = () => {
    const [value, setValue] = useState('')
    const debouncedValue = useDebounce<string>(value, 500);

    useEffect(()=>{
        dispatch(getPacksByTitle(value));
    },[debouncedValue])

    const dispatch = useAppDispatch();

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    return (
        <div className='search'>
            <div className="search__title">Search</div>
            <label className='search__label'>
                <input
                    value={value}
                    onChange={onChangeHandler}
                    placeholder={'Provide your text'}
                    type="text"
                    className="search__input"/>
            </label>
        </div>
    );
};

export default Search;