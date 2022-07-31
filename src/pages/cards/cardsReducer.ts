import {cardsAPI, PacksDataType, PackType} from "../../api/api";
import {Dispatch} from "redux";

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
    return {type: 'SET-PACKS', data} as const
}
export const setPacksTotalCount = (value: number) => {
    return {type: 'SET-PACKS-COUNT', value} as const
}

export const getPacks = (page: number, pageCount: number) => (dispatch: Dispatch) => {
    cardsAPI.getPacks(page, pageCount)
        .then((res) => {
            console.log(res.data)
            dispatch(setPacks(res.data.cardPacks))
            dispatch(setPacksTotalCount(res.data.cardPacksTotalCount))
        })
}

//test получить список карточек

export const fetchCards = (packId: string) => (dispatch: Dispatch) => {
    cardsAPI.getCards(packId)
        .then((res) => {
            console.log(res.data)
        })
}

export const pageChanged = (currentPage: number, pageSize: number)=> (dispatch: Dispatch)=> {
    console.log(currentPage)
    cardsAPI.getPacks(currentPage, pageSize)
        .then(res => {

            dispatch(setPacks(res.data.cardPacks))
        })
}


type InitStateType = PacksDataType
type setCardsChangedType = ReturnType<typeof setPacks> | ReturnType<typeof setPacksTotalCount>
export type CardsActionsType = setCardsChangedType
