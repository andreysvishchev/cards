import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks';
import { setMinMaxCount, setPacksTotalCount } from '../../pages/packsList/packsReducer';

export const RangeSlider = () => {
  const totalCount = useAppSelector(state => state.packs.cardPacksTotalCount);
  const minCardsCount = useAppSelector(state => state.packs.minCardsCount);
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount);
  const disabled = useAppSelector(state => state.app.status);

  const dispatch = useAppDispatch();
  // @ts-ignore
  const [values, setValues] = useState<number[]>([minCardsCount, maxCardsCount]);
  const [timerId, setTimerId] = useState<number>(0);
  const delay = 500;

  useEffect(() => {
    dispatch(setPacksTotalCount(1, totalCount));
  }, [dispatch, totalCount]);

  useEffect(() => {
    setValues([minCardsCount, maxCardsCount]);
  }, [minCardsCount, maxCardsCount]);

  const onChangeDoubleRange = (event: Event, newValue: number | number[]): void => {
    const newVariableValue = newValue as number[];

    setValues(newVariableValue);
    clearTimeout(timerId);
    const id: number = +setTimeout(
      dispatch,
      delay,
      setMinMaxCount(newVariableValue[0], newVariableValue[1]),
    );

    setTimerId(id);
  };

  return (
    <div>
      <div>
        <div className="slider__title">Show packs cards</div>
        <div className="slider__items">
          <span className="slider__min">{values[0]}</span>
          <Box sx={{ width: 150 }}>
            <Slider
              min={minCardsCount}
              max={maxCardsCount}
              getAriaLabel={() => 'Temperature range'}
              value={values}
              onChange={onChangeDoubleRange}
              valueLabelDisplay="auto"
              disabled={disabled === 'loading'}
            />
          </Box>
          <span className="slider__max">{values[1]}</span>
        </div>
        <div />
      </div>
    </div>
  );
};
