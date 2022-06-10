import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';

import { AppState } from 'src/app/store/app.reducers';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';

@Component({
	selector: 'app-lista',
	templateUrl: './lista.component.html',
	styles: [
		`
			.card-width {
				width: 250px;
			}
		`
	]
})
export class ListaComponent implements OnInit {

	usuarios: Usuario[] = [];
	loading: boolean = false;
	error: any;

	constructor( private store: Store<AppState	>) { }

	ngOnInit(): void {

		this.store.select('usuarios').subscribe( ({ users, loading, error }) => {
			this.usuarios = users;
			this.loading = loading;
			this.error = error;
		})

		this.store.dispatch( cargarUsuarios() );

	}

}
