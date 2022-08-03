import React, { useEffect } from 'react';

import { PackType, QueryParamsType } from '../../../api/CardsApi';
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks';
import { fetchGetPacks } from '../cardsReducer';

import Pack from './pack/Pack';

const Packs = () => {
  const dispatch = useAppDispatch();
  const packs = useAppSelector<PackType[]>(state => state.cards.cardPacks);
  const packsParams = useAppSelector<QueryParamsType>(state => state.cards.params);

  useEffect(() => {
    dispatch(fetchGetPacks({}));
  }, [dispatch, packsParams]);

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

export default Packs;
