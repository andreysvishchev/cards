import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { getMyPacks, getPacks } from '../../pages/cards/packsReducer';

const Filter = () => {
  const [isActive, setIsActive] = useState(false);

  const id = useAppSelector(state => state.profile._id);
  const dispatch = useAppDispatch();

  const getMyPacksHandler = () => {
    dispatch(getMyPacks(id));
    setIsActive(true);
  };
  const getAllPacksHandler = () => {
    dispatch(getPacks({}));
    setIsActive(false);
  };

  return (
    <div className="filter">
      <div className="filter__title">Show packs cards</div>
      <div className="filter__buttons">
        <button
          onClick={getMyPacksHandler}
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

export default Filter;