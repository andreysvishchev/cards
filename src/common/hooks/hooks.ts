import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppStateType } from '../../app/store';
import { ThunkDispatchType } from '../types/types';

export const useAppDispatch: () => ThunkDispatchType = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
