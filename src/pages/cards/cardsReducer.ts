import {cardsAPI, PacksDataType, PackType} from "../../api/api";
import {AppThunkType} from "../../hooks/hooks";

const initState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
}
export const cardsReducer = (state: InitStateType = initState, actions: CardsActionsType): InitStateType => {
    switch (actions.type) {
        case "SET-PACKS":
            return {...state, cardPacks: actions.data}
        case "SET-PACKS-COUNT":
            return {...state, cardPacksTotalCount: actions.value}
        default:
            return state
    }
}

export const setPacks = (data: PackType[]) => {
    return {type: 'SET-PACKS', data} as const;
}
export const setPacksTotalCount = (value: number) => {
    return {type: 'SET-PACKS-COUNT', value} as const;
}

export const getPacks = (page: number, pageCount: number): AppThunkType => (dispatch) => {
    cardsAPI.getPacks(page, pageCount)
        .then((res) => {
            console.log(res.data)
            dispatch(setPacks(res.data.cardPacks))
            dispatch(setPacksTotalCount(res.data.cardPacksTotalCount))
        })
}

//test получить список карточек

export const fetchCards = (packId: string): AppThunkType => (dispatch) => {
    cardsAPI.getCards(packId)
        .then((res) => {
            console.log(res.data)
        })
}

export const pageChanged = (currentPage: number, pageSize: number): AppThunkType => (dispatch) => {
    console.log(currentPage)
    cardsAPI.getPacks(currentPage, pageSize)
        .then(res => {
            dispatch(setPacks(res.data.cardPacks));
        })
}

export const getPacksByTitle = (title: string): AppThunkType => async (dispatch) => {
    try {
        const response = await cardsAPI.getPacksByTitle(title);
        dispatch(setPacks(response.data.cardPacks));
    } catch (e) {

    } finally {

    }

}


type InitStateType = PacksDataType;
type SetCardsChangedType = ReturnType<typeof setPacks> | ReturnType<typeof setPacksTotalCount>;
export type CardsActionsType = SetCardsChangedType;