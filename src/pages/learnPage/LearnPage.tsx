import React, { useEffect, useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';

import { CardType } from '../../api/CardsApi';
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { Button } from '../../components/button/Button';
import { LocationStateType } from '../packsList/cards/CardsPage';
import { getCards, putCardGrade } from '../packsList/cards/cardsReducer';

import { Grades } from './grades/Grades';

const getCard = (cards: CardType[]) => {
  const maxGradeValue = 6;
  const sum = cards.reduce(
    (acc, card) => acc + (maxGradeValue - card.grade) * (maxGradeValue - card.grade),
    0,
  );
  const rand = Math.random() * sum;
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum =
        acc.sum + (maxGradeValue - card.grade) * (maxGradeValue - card.grade);

      return { sum: newSum, id: newSum < rand ? i : acc.id };
    },
    { sum: 0, id: -1 },
  );

  return cards[res.id + 1];
};

export const LearnPage = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [grade, setGrade] = useState(1);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const disabled = useAppSelector(state => state.app.status);
  const cards = useAppSelector(state => state.cards.cards);
  const { packName, id } = location.state as LocationStateType;

  useEffect(() => {
    dispatch(getCards(id));

    if (cards.length > 0) setCard(getCard(cards));
  }, [dispatch, id]);

  const [card, setCard] = useState<CardType>({
    _id: '',
    cardsPack_id: '',
    user_id: '',
    answer: '',
    question: '',
    grade: 0,
    shots: 0,
    questionImg: '',
    answerImg: '',
    answerVideo: '',
    questionVideo: '',
    comments: '',
    type: '',
    rating: 0,
    more_id: '',
    created: '',
    updated: '',
    __v: 0,
  });

  const navToPacksList = () => {
    if (disabled === 'idle') {
      navigate('/packs');
    }
  };

  const handleSetShowAnswer = () => {
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    dispatch(putCardGrade({ grade, card_id: card._id }));
    setShowAnswer(false);
  };

  return (
    <div className="learn">
      <div onClick={navToPacksList} className="learn__back">
        <ArrowBackIcon />
        Back to Packs List
      </div>
      <div className="frame">
        <h3 className="title">{packName}</h3>
        <div className="learn__question">
          <div className="learn__question-name">
            <b>Question:</b>
            <span>{card.question}</span>
          </div>
          <div className="learn__answer-count">
            Количество попыток ответов на вопрос: {card.shots}
          </div>
        </div>
        <div className="learn__btn">
          <Button callBack={handleSetShowAnswer} title="Show answer" submit={false} />
        </div>
        {showAnswer && (
          <div className="learn__answer">
            <Grades setGrade={setGrade} />
            <div className="learn__btn">
              <Button title="Next question" submit={false} callBack={nextQuestion} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
