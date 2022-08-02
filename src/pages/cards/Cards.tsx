import React from 'react';
import Button from "../../components/button/Button";
import Search from "../../components/search/Search";
import Filter from "../../components/filter/Filter";
import RangeSlider from "../../components/rangeSlider/rangeSlider";
import Packs from "./packs/Packs";
import Pagination from "../../components/pagination/Pagination";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {addPack, fetchGetPacks} from "./cardsReducer";

const Cards = () => {
	const dispatch = useAppDispatch()
    const pageSize = useAppSelector(state => state.cards.pageCount)
    const currentPage = useAppSelector(state => state.cards.page)
    const totalCount = useAppSelector(state => state.cards.params.cardPacksTotalCount)

	const AddNewPackHandler = () => {
		dispatch(addPack())

	}

    return (
        <div className='cards'>
            <div className="cards__top">
                <div className="cards__title">Packs list</div>
                <Button title={'Add new pack'} callBack = {AddNewPackHandler}/>
            </div>
            <div className="cards__menu">
                <Search/>
                <Filter/>
                <RangeSlider/>
            </div>
            <Packs/>
            <Pagination totalCount={totalCount}/>
        </div>
    );
};

export default Cards;
