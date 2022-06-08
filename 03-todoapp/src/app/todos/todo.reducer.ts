import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import * as actions from './todo.actions';

export const estadoInicial: Todo[] = [
	new Todo('Vencer a Thanos'),
	new Todo('Comprar traje de Iron man'),
	new Todo('Robar escudo de Capitán América'),
	new Todo('Recolectar piedras del infinito'),
];

export const todoReducer = createReducer(
	estadoInicial,
	on(actions.crear, ( state, { texto } ) => state = [ ... state, new Todo( texto ) ]),
	on(actions.borrarCompletados, ( state ) => state.filter( todo => !todo.completado )),
	on(actions.toggleAll, ( state, { completado } ) => {
		return state.map( todo => {
			return {
				...todo,
				completado
			};
		});
	}),
	on(actions.borrar, ( state, { id } ) => state.filter( todo => todo.id !== id ) ),
	on(actions.toggle, ( state, { id } ) => {
		return state.map( todo => {
			if ( todo.id === id ) {
				return { ...todo, completado: !todo.completado };
			} else {
				return todo;
			}
		});
	}),
	on(actions.editar, ( state, { id, texto } ) => {
		return state.map( todo => {
			if ( todo.id === id ) {
				return { ...todo, texto };
			} else {
				return todo;
			}
		});
	}),
	
);

