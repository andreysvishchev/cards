import {cardsAPI, PacksDataType, PackType} from "../../api/api";
import {AppThunkType} from "../../hooks/hooks";

const initState = {
	user_id: undefined, // pack id
	cardPacks: [], // all packs
	cardPacksTotalCount: 10, // all packs count
	minCardsCount: 0, // min cards number
	maxCardsCount: 110, // max cards number
	page: 1, // for pagination
	pageCount: 10, // count element ui (number of  packs on page)
	search: null,
	packName: '',
	sortPacks: '0updated',
	params: {
		user_id: undefined,
		page: 1,
		pageCount: 10, // 10/25/50
		sortPacks: '0updated',
		min: 0, // min cards for selector
		max: 80, // max cards for selector
		cardPacksTotalCount: 10, //all
		packName: '',
	}

}
export const cardsReducer = (state: any = initState, actions: CardsActionsType): any => {
    switch (actions.type) {
        case "SET-PACKS":
			console.log({...actions.payload})
            return {...state, ...actions.payload}
        case "SET-PACKS-COUNT":
            return {...state, params:{...state.params, cardPacksTotalCount: actions.value} }
		case "SET-MIN-MAX-COUNT": {
			return {...state, params: {...state.params, min: actions.min, max: actions.max}}
		}
		case "SET-PAGINATION": {
			console.log(actions)
			return {...state, params: {...state.params, page: actions.page, pageCount: actions.pageCount}}
		}
		case "RESET-PAGE": {
			return {...state, params: {...state.params,page: actions.page}}
		}
		default:
            return state
    }
}

export const setPacks = (payload: any) => {
    return {type: 'SET-PACKS', payload} as const
}
export const setPacksTotalCount = (value: number) => {
    return {type: 'SET-PACKS-COUNT', value} as const
}
export const setMinMaxCount = (min: number, max: number) => {
	return {type: 'SET-MIN-MAX-COUNT', min, max} as const
}
export const setPagination = (page: number, pageCount: number) => {
	return {type: 'SET-PAGINATION', page, pageCount} as const
}
export const resetPage = (page: number) => {
	return {type: 'RESET-PAGE', page} as const
}

export const fetchGetPacks = (params: GetPackRequestType) => (dispatch: Dispatch, getState: any) => {
	let stateParams = getState().cards.params
	let advancedOptions = {...stateParams,  ...params};
	cardsAPI.getPacks(advancedOptions)
		.then((res) => {
			dispatch(setPacks({...res.data}));
		})
	/*let {user_id, page, pageCount, sortPacks, min, max, cardPacksTotalCount, packName} = getState().cards;
	let advancedOptions = {user_id, page, pageCount, sortPacks, min , max, cardPacksTotalCount, packName,  ...params};
	cardsAPI.getPacks(advancedOptions)
		.then((res) => {
			dispatch(setPacks({...res.data}));
		})*/
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

/*export const getPacks = (page: number, pageCount: number): AppThunkType => (dispatch) => {
	cardsAPI.getPacks(page, pageCount)
		.then((res) => {
			console.log(res.data)
			dispatch(setPacks(res.data.cardPacks))
			dispatch(setPacksTotalCount(res.data.cardPacksTotalCount))
		})
}*/
/*//let {user_id, page, pageCount, sortPacks, min, max, cardPacksTotalCount, packName} = getState().cards;
let stateParams = getState().cards.params
let advancedOptions = {...stateParams,  ...params};
cardsAPI.getPacks(advancedOptions)
	.then((res) => {
		dispatch(setPacks({...res.data}));
	})
}*/

/*export const getPacks = (page: number, pageCount: number) => (dispatch: Dispatch) => {
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

// /*export const pageChanged = (currentPage: number, pageSize: number)=> (dispatch: Dispatch)=> {
//     console.log(currentPage)
//     cardsAPI.getPacks(currentPage, pageSize)
//         .then(res => {
//
//
//  */
//             dispatch(setPacks(res.data.cardPacks))
//         })
// }*/

/*export const getMinMaxCards = (min: number, max: number)=> (dispatch: Dispatch)=> {
	debugger;
	cardsAPI.getMinMaxCards(min, max)
		.then(res => {
			debugger;
			console.log(res)
			getPacks(res.data.page, res.data.pageCount)
			dispatch(setMinMaxCount(min, max))
		})
}*/


type InitStateType = {
	user_id: string | undefined,
	cardPacks: PackType[],
	cardPacksTotalCount: number
	minCardsCount: number
	maxCardsCount: number
	page: number
	pageCount: number
	search?: string | null
	packName?: string
	sortPacks?: string
	min?: number,
	max?: number,

}

type CardsPackType = {
	_id: string
	user_name: string
	rating: number
	user_id: string
	name: string
	cardsCount: number
	created: Date
	updated: Date
}

/*type InitStateType = PacksDataType*/
type setCardsChangedType = ReturnType<typeof setPacks> | ReturnType<typeof setPacksTotalCount> | ReturnType<typeof setMinMaxCount> | ReturnType<typeof setPagination> | ReturnType< typeof resetPage>
export type CardsActionsType = setCardsChangedType
