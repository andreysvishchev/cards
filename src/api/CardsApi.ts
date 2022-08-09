import { instance } from './instance/instance';
import { GetPackRequestType, PacksDataType } from './PackApi';

export const cardsApi = {
  getCards(packId: string, params: any) {
    return instance.get<CardsType>(`cards/card?cardsPack_id=${packId}`, {
      params: { ...params },
    });
  },
  getPacks(params: any) {
    return instance.get<PacksDataType>(`cards/pack`, { params: { ...params } });
  },
};

export type CardsParamsType = {
  cardQuestion?: string;
  page?: number;
  pageCount?: number;
  sortCards?: string;
  cardsPack_id?: string;
};

export type CardsType = {
  cards: CardType[];
  packUserId: string;
  page: number;
  pageCount: number;
  cardsTotalCount: number;
  minGrade: number;
  maxGrade: number;
  token: string;
  tokenDeathTime: number | null;
  params: CardsParamsType;
};

export type CardType = {
  _id: string;
  cardsPack_id: string;
  user_id: string;
  answer: string;
  question: string;
  grade: number;
  shots: number;
  questionImg: string;
  answerImg: string;
  answerVideo: string;
  questionVideo: string;
  comments: string;
  type: string;
  rating: number;
  more_id: string;
  created: string;
  updated: string;
  __v: number;
};
