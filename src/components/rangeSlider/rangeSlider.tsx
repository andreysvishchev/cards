import React, {useEffect, useState} from 'react';
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {resetPage, setMinMaxCount, setPacksTotalCount} from "../../pages/cards/cardsReducer";

const RangeSlider = () => {

	const totalCount = useAppSelector(state => state.cards.cardPacksTotalCount)
	const minCardsCount = useAppSelector(state => state.cards.minCardsCount)
	const maxCardsCount = useAppSelector(state => state.cards.maxCardsCount)

	const dispatch = useAppDispatch();
	const [values, setValues] = useState<number[]>([minCardsCount, maxCardsCount])
	const [timerId, setTimerId] = useState<number>(0)


	useEffect(() => {
		dispatch(setPacksTotalCount(totalCount))
		dispatch(resetPage(1))
	}, [totalCount])

	const onChangeDoubleRange = (event: Event, newValue: number | number[]) => {
		const newVariableValue = newValue as number []
		setValues(newVariableValue)
		clearTimeout(timerId)
		const id: number = +setTimeout(dispatch, 500, setMinMaxCount(newVariableValue[0], newVariableValue[1]),)
		setTimerId(id)
	}

	return (
        <div>
           <div>
			   <div className="slider__title">Show packs cards</div>
			   <div className="slider__items">
				   <span  className="slider__min">{values[0]}</span>
				   <Box sx={{width: 150}}>
					   <Slider
						   min={minCardsCount}
						   max={maxCardsCount}
						   getAriaLabel={() => 'Temperature range'}
						   value={values}
						   onChange={onChangeDoubleRange}
						   valueLabelDisplay="auto"
					   />
				   </Box>
				   <span  className="slider__max">{values[1]}</span>
			   </div>
			   <div>
			   </div>
		   </div>
        </div>
    );
};

export default RangeSlider;