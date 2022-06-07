import { 
	decrementadorAction,
	dividirAction,
	incrementadorAction,
	multiplicarAction,
} from './contador/contador.actions';

// Acciones
interface Action {
	type: string;
	payload?: any;
}

function reducer( state = 10, action: Action ) {
	switch( action.type ) {
		case 'INCREMENTAR':
			return state += 1;

		case 'DECREMENTAR':
			return state -= 1;
		
		case 'MULTIPLICAR':
			return state * action.payload;

		case 'DIVIDIR':
			return state / action.payload;

		default:
			return state;
	}
}

// Usar el reducer
console.log( reducer( 10, incrementadorAction ) ); // 11
console.log( reducer( 10, decrementadorAction ) ); // 9
console.log( reducer( 10, multiplicarAction ) ); // 20
console.log( reducer( 10, dividirAction ) ); // 5
 


