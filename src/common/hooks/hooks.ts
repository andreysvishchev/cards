import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { AppStateType } from '../../app/store';
import { ActionTypeForApp } from '../types/types';

// типизация для диспатча санок в санках
export type AppThunkType = ThunkAction<void, AppStateType, unknown, ActionTypeForApp>;
export type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionTypeForApp>;

export const useAppDispatch: () => ThunkDispatchType = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
