import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { filter, Subscription } from 'rxjs';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';
import { AppState } from '../app.reducer';

import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

	userSubs!: Subscription;
	ingresosSubs!: Subscription;

	constructor(
		private store: Store<AppState>,
		private ingresoEgresoService: IngresoEgresoService
	) { }
	
	ngOnDestroy(): void {
		this.userSubs.unsubscribe();
		this.ingresosSubs.unsubscribe();
	}

	ngOnInit(): void {

		this.userSubs = this.store.select('user')
			.pipe(
				filter( auth => auth.user !== null )
			)
			.subscribe( ({ user }) => {
				this.ingresosSubs = this.ingresoEgresoService.initIngresosEgresosListener( user?.uid! )
					.subscribe( ingresosEgresosFB => {
						this.store.dispatch( ingresoEgresoActions.setItems({ items: ingresosEgresosFB }) );
					});
			});

	}

}
