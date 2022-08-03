import React from 'react';

import { useAppDispatch } from '../../common/hooks/hooks';
import Button from '../../components/button/Button';
import Filter from '../../components/filter/Filter';
import Pagination from '../../components/pagination/Pagination';
import RangeSlider from '../../components/rangeSlider/rangeSlider';
import Search from '../../components/search/Search';

import Packs from './packs/Packs';
import { addPack } from './packsReducer';

const PacksList = () => {
  const dispatch = useAppDispatch();

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
      <Pagination />
    </div>
  );
};

export default PacksList;
