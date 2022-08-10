import { cardsApi, CardsType } from '../../../api/CardsApi';
import { sortingMethods } from '../../../api/PackApi';
import { changeAppStatus, setError } from '../../../app/appReducer';
import { AppStateType } from '../../../app/store';
import { AppThunkType } from '../../../common/types/types';

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
  pageCount: 10,
  cardsTotalCount: 1,
  minGrade: 0,
  maxGrade: 6,
  token: '',
  tokenDeathTime: null,
  params: {
    cardQuestion: '',
    page: 1,
    pageCount: 10,
    sortCards: sortingMethods.DES_UPDATE,
    cardsPack_id: undefined,
  },
};

export const cardsReducer = (state = initState, action: CardsActionsType): CardsType => {
  switch (action.type) {
    case 'CARDS/SET_CARDS': {
      return { ...state, ...action.payload };
    }
    case 'CARDS/SET-PAGINATION': {
      return {
        ...state,
        params: { ...state.params, page: action.page, pageCount: action.pageCount },
      };
    }
    case 'CARDS/GET-PACKS-BY-TITLE': {
      return { ...state, params: { ...state.params, cardQuestion: action.title } };
    }
    default:
      return state;
  }
};

export const setCards = (payload: any) => {
  return {
    type: 'CARDS/SET_CARDS',
    payload,
  } as const;
};

export const setCardsPagination = (page: number, pageCount: number) => {
  return { type: 'CARDS/SET-PAGINATION', page, pageCount } as const;
};
export const getCardsByTitle = (title: string) => {
  return { type: 'CARDS/GET-PACKS-BY-TITLE', title } as const;
};

export const getCards =
  (packId: string): AppThunkType =>
  async (dispatch, getState: () => AppStateType) => {
    dispatch(changeAppStatus('loading'));
    try {
      const stateParams = getState().cards.params;
      const response = await cardsApi.getCards(packId, { ...stateParams });

      dispatch(setCards({ ...response.data }));
    } catch (err: any) {
      dispatch(setError(err.response.data.error));
    } finally {
      dispatch(changeAppStatus('idle'));
    }
  };

export const addCard =
  (packId: string, question: string, answer: string): AppThunkType =>
  async dispatch => {
    const card = {
      cardsPack_id: packId,
      question,
      answer,
    };

    dispatch(changeAppStatus('loading'));
    try {
      await cardsApi.postCard(card);
      dispatch(getCards(packId));
    } catch (err: any) {
      dispatch(setError(err.response.data.error));
    } finally {
      dispatch(changeAppStatus('idle'));
    }
  };

export const deleteCard =
  (packId: string, cardId: string): AppThunkType =>
  async dispatch => {
    dispatch(changeAppStatus('loading'));
    try {
      console.log(packId, cardId);
      await cardsApi.deleteCard({ id: cardId });
      dispatch(getCards(packId));
    } catch (err: any) {
      dispatch(setError(err.response.data.error));
    } finally {
      dispatch(changeAppStatus('idle'));
    }
  };

export const changeCardName =
  (packId: string, cardId: string, question: string, answer: string): AppThunkType =>
  async dispatch => {
    const card = { _id: cardId, question, answer };

    dispatch(changeAppStatus('loading'));
    try {
      await cardsApi.updateCard(card);
      dispatch(getCards(packId));
    } catch (err: any) {
      dispatch(setError(err.response.data.error));
    } finally {
      dispatch(changeAppStatus('idle'));
    }
  };

type SetCardsType = ReturnType<typeof setCards>;
type setPaginationType = ReturnType<typeof setCardsPagination>;
type getCardsByTitleType = ReturnType<typeof getCardsByTitle>;
export type CardsActionsType = SetCardsType | setPaginationType | getCardsByTitleType;