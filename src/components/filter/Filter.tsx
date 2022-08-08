import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import {
  setPacksOfAllUsers,
  setPacksOfCertainUser,
} from '../../pages/packsList/packsReducer';

export const Filter = () => {
  const [isActive, setIsActive] = useState(false);

  const id = useAppSelector(state => state.profile._id);
  const disabled = useAppSelector(state => state.app.status);
  const dispatch = useAppDispatch();

  const getMyPacksHandler = () => {
    dispatch(setPacksOfCertainUser(id));
    setIsActive(true);
  };
  const getAllPacksHandler = () => {
    dispatch(setPacksOfAllUsers());
    setIsActive(false);
  };

  return (
    <div className="filter">
      <div className="filter__title">Show packs cards</div>
      <div className="filter__buttons">
        <button
          onClick={getMyPacksHandler}
          disabled={disabled === 'loading'}
          type="button"
          className={
            isActive
              ? 'filter__button filter__button--blue'
              : 'filter__button filter__button--light'
          }
        >
          My
        </button>
        <button
          onClick={getAllPacksHandler}
          type="button"
          disabled={disabled === 'loading'}
          className={
            isActive
              ? 'filter__button filter__button--light'
              : 'filter__button filter__button--blue'
          }
        >
          All
        </button>
      </div>
    </div>
  );
};
