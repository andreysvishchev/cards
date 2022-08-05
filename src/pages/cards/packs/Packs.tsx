import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks';
import { getPacks } from '../packsReducer';

import { Pack } from './pack/Pack';

export const Packs = () => {
  const packsParams = useAppSelector(state => state.packs.params);
  const dispatch = useAppDispatch();
  const packs = useAppSelector(state => state.packs.cardPacks);
  const page = useAppSelector(state => state.packs.params.page);
  const pageCount = useAppSelector(state => state.packs.params.pageCount);
  const sortPacks = useAppSelector(state => state.packs.params.sortPacks);
  const min = useAppSelector(state => state.packs.params.min);
  const max = useAppSelector(state => state.packs.params.max);
  const packName = useAppSelector(state => state.packs.params.packName);

  useEffect(() => {
    dispatch(getPacks({}));
  }, [dispatch, page, pageCount, sortPacks, min, max, packName]);

  return (
    <div className="packs">
      <div className="packs__captions">
        <div className="packs__caption">Name</div>
        <div className="packs__caption">Cards</div>
        <div className="packs__caption">Last Updated</div>
        <div className="packs__caption">Created by</div>
        <div className="packs__caption">Actions</div>
      </div>
      <div className="packs__list">
        {packs.map(el => {
          return (
            <Pack
              key={el._id}
              id={el._id}
              authorId={el.user_id}
              name={el.name}
              author={el.user_name}
              cards={el.cardsCount}
              lastUploaded={el.updated}
            />
          );
        })}
      </div>
    </div>
  );
};
