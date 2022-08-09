import React, { memo, useEffect } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks';
import { Pagination } from '../../../components/pagination/Pagination';
import { Search } from '../../../components/search/Search';

import { Card } from './Card';
import { getCards } from './cardsReducer';
import { EmptyPackPage } from './EmptyPackPage';

export const CardsPage = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { packName } = location.state as LocationStateType;
  const { id } = location.state as LocationStateType;
  const cards = useAppSelector(state => state.cards.cards);

  const dispatch = useAppDispatch();
  const page = useAppSelector(state => state.cards.params.page);
  const cardQuestion = useAppSelector(state => state.cards.params.cardQuestion);
  const pageCount = useAppSelector(state => state.cards.params.pageCount);
  const sortCards = useAppSelector(state => state.cards.params.sortCards);

  useEffect(() => {
    if (id) {
      dispatch(getCards(id));
    }
  }, [dispatch, page, cardQuestion, pageCount, sortCards, id]);

  const navToPacksList = () => {
    navigate('/packs');
  };

  if (cards.length === 0) {
    return <EmptyPackPage packName={packName} />;
  }

  return (
    <div className="cards">
      <div className="cards__top">
        <div onClick={navToPacksList} className="cards__back">
          <ArrowBackIcon />
          Back to Packs List
        </div>
      </div>
      <div className="cards__title">{packName}</div>
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
  id: string;
};
