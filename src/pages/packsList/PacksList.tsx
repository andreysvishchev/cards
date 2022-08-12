import React, { useState } from 'react';

import FilterAltOffTwoToneIcon from '@mui/icons-material/FilterAltOffTwoTone';
import IconButton from '@mui/material/IconButton';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { Button } from '../../components/button/Button';
import { Filter } from '../../components/filter/Filter';
import { AddAndEditPackModal } from '../../components/modals/AddAndEditPackModal';
import { Pagination } from '../../components/pagination/Pagination';
import { RangeSlider } from '../../components/rangeSlider/rangeSlider';
import { Search } from '../../components/search/Search';

import { Packs } from './Packs';
import { setResetPacksParams } from './packsReducer';

export const PacksList = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.app.status);
  const id = useAppSelector(state => state.profile._id);

  // Modals
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  // reset all params
  const clearFiltersHandler = () => {
    dispatch(setResetPacksParams(''));
  };

  return (
    <div className="cards">
      <div className="cards__top">
        <div className="cards__title">Packs list</div>
        <Button
          title="Add new pack"
          callBack={handleOpen}
          submit={false}
          disabled={status === 'loading'}
        />
      </div>
      <AddAndEditPackModal title="Add new pack" open={open} handleClose={handleClose} />
      <div className="cards__menu">
        <Search location="Packs" />
        <Filter />
        <RangeSlider />
        <div className="cards__filter">
          <IconButton
            onClick={clearFiltersHandler}
            aria-label="clearAll"
            disabled={status === 'loading'}
          >
            <FilterAltOffTwoToneIcon fontSize="inherit" />
          </IconButton>
        </div>
      </div>
      <Packs />
      <Pagination location="Packs" />
    </div>
  );
};
