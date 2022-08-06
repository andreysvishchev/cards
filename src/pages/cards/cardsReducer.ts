import { cardsApi, CardsType, CardType } from '../../api/CardsApi';
import { changeAppStatus, setError } from '../../app/appReducer';
import { AppThunkType } from '../../common/types/types';

const initState: CardsType = {
  cards: [
    {
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
      comments: 'n',
      type: '',
      rating: 0,
      more_id: '',
      created: '',
      updated: '',
      __v: 0,
    },
  ],
  packUserId: '',
  page: 1,
  pageCount: 4,
  cardsTotalCount: 1,
  minGrade: 0,
  maxGrade: 6,
  token: '',
  tokenDeathTime: null,
};

export const cardsReducer = (state = initState, action: CardsActionsType): CardsType => {
  switch (action.type) {
    case 'CARDS/SET_CARDS': {
      return { ...state, cards: action.payload.card };
    }
    default:
      return state;
  }
};

const setCards = (card: CardType[]) => {
  return {
    type: 'CARDS/SET_CARDS',
    payload: { card },
  } as const;
};

export const getCards =
  (packId: string): AppThunkType =>
  async dispatch => {
    dispatch(changeAppStatus('loading'));
    try {
      const response = await cardsApi.getCards(packId);

      dispatch(setCards(response.data.cards));
    } catch (err: any) {
      dispatch(setError(err.response.data.error));
    } finally {
      dispatch(changeAppStatus('idle'));
    }
  };

type SetCardsType = ReturnType<typeof setCards>;
export type CardsActionsType = SetCardsType;
