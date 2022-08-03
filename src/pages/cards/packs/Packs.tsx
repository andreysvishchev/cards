import React, { useEffect } from 'react';

import { PackType, QueryParamsType } from '../../../api/PackApi';
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks';
import { fetchGetPacks } from '../packsReducer';

import Pack from './pack/Pack';

const Packs = () => {
  const packsParams = useAppSelector<QueryParamsType>(state => state.packs.params);
  const dispatch = useAppDispatch();
  const packs = useAppSelector<PackType[]>(state => state.packs.cardPacks);
  const page = useAppSelector<number>(state => state.packs.params.page);
  const pageCount = useAppSelector<number>(state => state.packs.params.pageCount);
  const sortPacks = useAppSelector<string>(state => state.packs.params.sortPacks);
  const min = useAppSelector<number | undefined>(state => state.packs.params.min);
  const max = useAppSelector<number | undefined>(state => state.packs.params.max);
  const packName = useAppSelector<string>(state => state.packs.params.packName);

  useEffect(() => {
    dispatch(fetchGetPacks({}));
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

export default Packs;
