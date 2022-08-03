import React from 'react';

import { ReturnComponentType } from '../../common/types/ReturnComponentsType';

const Filter = (): ReturnComponentType => {
  return (
    <div className="filter">
      <div className="filter__title">Show packs cards</div>
      <div className="filter__buttons">
        <button type="button" className="filter__button filter__button--light">
          My
        </button>
        <button type="button" className="filter__button filter__button--blue">
          All
        </button>
      </div>
    </div>
  );
};

export default Filter;
