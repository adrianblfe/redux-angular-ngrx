import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

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

	constructor( public usuariosService: UsuarioService ) { }

	ngOnInit(): void {
		this.usuariosService.getUsers()
			.subscribe( users => {
				console.log(users);
				this.usuarios = users;
			});

	}

}
