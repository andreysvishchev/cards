import { cardsApi, CardsType, CardType } from '../../api/CardsApi';
import { AppThunkType } from '../../common/hooks/hooks';

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

export const getCards = (): AppThunkType => async dispatch => {
  const response = await cardsApi.getCards('62e7d5d7e6cac4192079781a');

  dispatch(setCards(response.data.cards));
};

type SetCardsType = ReturnType<typeof setCards>;
export type CardsActionsType = SetCardsType;
