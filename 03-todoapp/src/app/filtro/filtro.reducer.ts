import { createReducer, on } from '@ngrx/store';
import { setFiltro, filtrosValidos } from './filtro.actions';
import { Action } from '../../../../01-redux-basic/ngrx-fake/ngrx';


export const initialState: filtrosValidos = 'todos';

export const filtroReducer = createReducer<filtrosValidos, Action>(
	initialState,
	on( setFiltro, (state, { filtro }) => filtro ),
);
