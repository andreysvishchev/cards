import React, {useEffect} from 'react';
import Pack from "./pack/Pack";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {fetchGetPacks} from "../cardsReducer";
import {PackType, QueryParamsType} from "../../../api/CardsApi";

const Packs = () => {
    const dispatch = useAppDispatch();
    const packs = useAppSelector<PackType[]>(state => state.cards.cardPacks)
    const packsParams = useAppSelector<QueryParamsType>(state => state.cards.params)

    useEffect(()=> {
        // dispatch(getPacks(page, pageCount))
		dispatch(fetchGetPacks({}))
    },[dispatch, packsParams])


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