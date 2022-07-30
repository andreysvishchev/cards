import React from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {PackType} from "../../api/api";
import {pageChanged} from "../../pages/cards/cardsReducer";

type PropsType = {
    pageSize: number
    currentPage: number
    totalCount: number
}

const Pagination = (props: PropsType) => {
    const dispatch = useAppDispatch();

    const pagesCount = Math.ceil(props.totalCount / props.pageSize)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
   /* let curP = props.currentPage;
    let curPF = ((curP - 5) < 0) ? 0 : curP - 5;
    let curPL = curP + 5;
    let slicedPages = pages.slice(curPF, curPL);*/


    return (
        <div className="pagination">
            <div className="pagination__list">
                {pages.map((el, i) => {
                    return (
                        <button key={i} onClick={() => {
                            dispatch(pageChanged(el, props.pageSize))
                        }}>{el}</button>
                    )
                })}
            </div>
        </div>
    );
};

export default Pagination;