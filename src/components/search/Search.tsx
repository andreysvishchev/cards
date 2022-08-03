import React, { ChangeEvent, useEffect, useState } from 'react';

import { useAppDispatch } from '../../common/hooks/hooks';
import { useDebounce } from '../../common/hooks/useDebounce';
import { ReturnComponentType } from '../../common/types/ReturnComponentsType';
import { getPacksByTitle } from '../../pages/cards/cardsReducer';

const Search = (): ReturnComponentType => {
  const delay = 500;
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce<string>(value, delay);

  useEffect(() => {
    dispatch(getPacksByTitle(value));
  }, [debouncedValue]);

  const dispatch = useAppDispatch();

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.currentTarget.value);
  };

  return (
    <div className="search">
      <div className="search__title">Search</div>
      <label htmlFor="input" className="search__label">
        <input
          value={value}
          onChange={onChangeHandler}
          placeholder="Provide your text"
          type="text"
          className="search__input"
        />
      </label>
    </div>
  );
};

export default Search;
