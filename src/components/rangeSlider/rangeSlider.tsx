import React, {useEffect, useState} from 'react';
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {resetPage, setMinMaxCount, setPacksTotalCount} from "../../pages/cards/cardsReducer";

const RangeSlider = () => {

	const dispatch = useAppDispatch();
	const [values, setValues] = useState<number[]>([0, 80])
	const [timerId, setTimerId] = useState<number>(0)
	const totalCount = useAppSelector(state => state.cards.cardPacksTotalCount)

	useEffect(() => {
		dispatch(setPacksTotalCount(totalCount))
		dispatch(resetPage(0))
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
			   <Box sx={{width: 150}}>
				   <Slider
					   min={0}
					   max={80}
					   getAriaLabel={() => 'Temperature range'}
					   value={values}
					   onChange={onChangeDoubleRange}
					   valueLabelDisplay="auto"

				   />
			   </Box>
			   <div>
				   <span>MIN: {values[0]}</span>
				   <span>MAX: {values[1]}</span>
			   </div>
		   </div>
        </div>
    );
};

export default RangeSlider;