import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { Caption } from '../../components/caption/Caption';

import { Pack } from './Pack';
import { getPacks } from './packsReducer';

export const Packs = () => {
  const dispatch = useAppDispatch();
  const packs = useAppSelector(state => state.packs.cardPacks);
  const userId = useAppSelector(state => state.packs.params.user_id);
  const page = useAppSelector(state => state.packs.params.page);
  const pageCount = useAppSelector(state => state.packs.params.pageCount);
  const sortPacks = useAppSelector(state => state.packs.params.sortPacks);
  const min = useAppSelector(state => state.packs.params.min);
  const max = useAppSelector(state => state.packs.params.max);
  const packName = useAppSelector(state => state.packs.params.packName);

  useEffect(() => {
    dispatch(getPacks({}));
  }, [dispatch, page, pageCount, sortPacks, min, max, packName, userId]);

  return (
    <div className="packs">
      <div className="packs__captions">
        <Caption name="Name" />
        <Caption name="Cards" />
        <Caption name="Last Updated" />
        <Caption name="Created by" />
        <Caption name="Actions" />
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
