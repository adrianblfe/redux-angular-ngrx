import { createReducer, on } from "@ngrx/store";
import * as actions from './contador.actions';

export const initialState = 20;

const _contadorReducer = createReducer(
	initialState,
	on(actions.incrementar	, state => state + 1),
	on(actions.decrementar	, state => state - 1),
	on(actions.reset		, state => initialState ),
	on(actions.multiplicar	, ( state, { numero } ) => state * numero ),
	on(actions.dividir		, ( state, { numero } ) => state / numero ),
);

export function contadorReducer( state: any, action: any ) {
	return _contadorReducer(state, action);
}
