import React, {useEffect} from 'react';
import Pack from "./pack/Pack";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {fetchGetPacks} from "../cardsReducer";
import {PackType} from "../../../api/CardsApi";

const Packs = () => {
    const dispatch = useAppDispatch();
    const packs = useAppSelector<PackType[]>(state => state.cards.cardPacks)

	//queryParams
    // const cardPacksTotalCount = useAppSelector<number>(state => state.cards.params.cardPacksTotalCount)
    // const user_id = useAppSelector<string | undefined>(state => state.cards.params.user_id)
    const page = useAppSelector<number>(state => state.cards.params.page)
    const pageCount = useAppSelector<number>(state => state.cards.params.pageCount)
    const sortPacks = useAppSelector<string>(state => state.cards.params.sortPacks)
    const min = useAppSelector<number | undefined>(state => state.cards.params.min)
    const max = useAppSelector<number | undefined>(state => state.cards.params.max)
    const packName = useAppSelector<string>(state => state.cards.params.packName)

    useEffect(()=> {
		dispatch(fetchGetPacks({}))
    },[dispatch, page, pageCount, sortPacks, min, max, packName])


    return (
        <div className="packs">
            <div className="packs__captions">
                <div className="packs__caption">Name</div>
                <div className="packs__caption">Cards</div>
                <div className="packs__caption">Last Updated</div>
                <div className="packs__caption">Created by</div>
                <div className="packs__caption">Actions</div>
            </div>
            <div className="packs__list">
                {packs.map(el => {
                    return (
                        <Pack key={el._id}
                              id={el._id}
							  authorId={el.user_id}
                              name={el.name}
                              author={el.user_name}
                              cards={el.cardsCount}
                              lastUploaded={el.updated}/>
                    )
                })}
            </div>
        </div>
    );
};

export default Packs;