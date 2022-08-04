import React, { memo, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks';
import Pagination from '../../../components/pagination/Pagination';
import Search from '../../../components/search/Search';
import { getCards } from '../cardsReducer';

import Card from './Card';

const PackPage = memo(() => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(state => state.cards.cards);
  // const packId = useAppSelector(state => state.);

  // useEffect(() => {
  //   dispatch(getCards(packId));
  // }, [dispatch]);

  return (
    <div className="cards">
      <div className="cards__top">
        <div className="cards__title">CardName</div>
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

export default PackPage;
