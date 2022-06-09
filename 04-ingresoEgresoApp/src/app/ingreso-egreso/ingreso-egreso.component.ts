import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ui from '../shared/ui.actions';

@Component({
	selector: 'app-ingreso-egreso',
	templateUrl: './ingreso-egreso.component.html',
	styles: [
	]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

	ingresoForm!: FormGroup;
	tipo: string = 'ingreso';
	cargando: boolean = false;
	loadingSubscription!: Subscription;

	constructor(
		private fb: FormBuilder,
		private store: Store<AppState>,
		private ingresoEgresoService: IngresoEgresoService
	) { }

	ngOnDestroy(): void {
		this.loadingSubscription.unsubscribe();
	}

	ngOnInit(): void {
		this.ingresoForm = this.fb.group({
			descripcion: [ '', Validators.required ],
			monto: [ '', Validators.required ],
		});

		this.loadingSubscription = this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading );
	}

	guardar() {

		this.store.dispatch( ui.isLoading() );

		
		if ( this.ingresoForm.invalid ) return;
		
		const { descripcion, monto } = this.ingresoForm.value;
		const ingresoEgreso = new IngresoEgreso( descripcion, monto, this.tipo );
		
		this.ingresoEgresoService.crearIngresoEgreso( ingresoEgreso )
		.then( () => {
			this.ingresoForm.reset();
			this.store.dispatch( ui.stopLoading() );
				Swal.fire('Registro creado', descripcion, 'success');
			})
			.catch( err => {
				this.store.dispatch( ui.stopLoading() );
				Swal.fire('Error', err.message, 'error')
			});
	}

}
