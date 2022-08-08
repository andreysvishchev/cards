import React, { memo, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks';
import { Pagination } from '../../../components/pagination/Pagination';
import { Search } from '../../../components/search/Search';
import { getPacks } from '../packsReducer';

import { Card } from './Card';

export const CardsPage = memo(() => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { packName } = location.state as LocationStateType;
  const cards = useAppSelector(state => state.cards.cards);

  useEffect(() => {
    dispatch(getPacks({}));
  }, [dispatch]);

  return (
    <div className="cards">
      <div className="cards__top">
        <div className="cards__title">{packName}</div>
      </div>
      <div className="cards__menu">
        <Search />
      </div>
      <div className="packs">
        <div className="packs__captions">
          <div className="packs__caption">Question</div>
          <div className="packs__caption">Answer</div>
          <div className="packs__caption">Last Updated</div>
          <div className="packs__caption">Grade</div>
        </div>
        <div className="packs__list" />
        {cards.map(el => {
          return (
            <Card
              key={el._id}
              question={el.question}
              answer={el.answer}
              grade={el.grade}
              lastUpdated={el.updated}
            />
          );
        })}
      </div>
      <Pagination />
    </div>
  );
});

type LocationStateType = {
  packName: string;
};
