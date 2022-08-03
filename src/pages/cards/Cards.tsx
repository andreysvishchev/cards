import React from 'react';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { ReturnComponentType } from '../../common/types/ReturnComponentsType';
import Button from '../../components/button/Button';
import Filter from '../../components/filter/Filter';
import Pagination from '../../components/pagination/Pagination';
import RangeSlider from '../../components/rangeSlider/rangeSlider';
import Search from '../../components/search/Search';

import { addPack } from './cardsReducer';
import Packs from './packs/Packs';

const Cards = (): ReturnComponentType => {
  const dispatch = useAppDispatch();
  const totalCount = useAppSelector(state => state.cards.params.cardPacksTotalCount);

  const AddNewPackHandler = (): void => {
    dispatch(addPack());
  };

  return (
    <div className="cards">
      <div className="cards__top">
        <div className="cards__title">Packs list</div>
        <Button title="Add new pack" callBack={AddNewPackHandler} submit={false} />
      </div>
      <div className="cards__menu">
        <Search />
        <Filter />
        <RangeSlider />
      </div>
      <Packs />
      <Pagination totalCount={totalCount} />
    </div>
  );
};

export default Cards;
