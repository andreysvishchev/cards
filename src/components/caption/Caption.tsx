import React from 'react';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { IconButton } from '@mui/material';

import { sortPacks } from '../../api/PackApi';
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { getPacksByOrder } from '../../pages/packsList/packsReducer';

export const Caption: React.FC<CaptionPropsType> = ({ name }) => {
  const dispatch = useAppDispatch();
  const sort = useAppSelector(state => state.packs.sortPacks);
  const orderPacks = () => {
    dispatch(getPacksByOrder());
  };

  return (
    <div className="packs__caption">
      {name}
      <div className="packs__caption-svg">
        <IconButton size="small" onClick={orderPacks}>
          {sort === sortPacks.DES_CARDS_COUNT ? (
            <ArrowDownwardIcon />
          ) : (
            <ArrowUpwardIcon />
          )}
        </IconButton>
      </div>
    </div>
  );
};

type CaptionPropsType = {
  name: string;
};
