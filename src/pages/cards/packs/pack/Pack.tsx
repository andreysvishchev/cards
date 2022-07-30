import React from 'react';
import {useAppDispatch} from "../../../../hooks/hooks";
import {fetchCards} from "../../cardsReducer";

type PropsType = {
    name: string
    author: string
    cards: number
    lastUploaded: string
    id: string
}


const Pack = (props: PropsType) => {
    const dispatch = useAppDispatch();

    const test = () => {
        dispatch(fetchCards(props.id))
    }

    return (
        <div className='pack'>
            <div className="pack__col" onClick={test}>{props.name}</div>
            <div className="pack__col">{props.cards}</div>
            <div className="pack__col">{props.lastUploaded}</div>
            <div className="pack__col">{props.author}</div>
            <div className="pack__col pack__col--actions">
                <button className="pack__button pack__button--del"/>
                <button className="pack__button pack__button--edit"/>
                <button className="pack__button pack__button--teach"/>
            </div>
        </div>
    );
};

export default Pack;