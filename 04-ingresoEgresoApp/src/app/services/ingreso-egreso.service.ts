import { Injectable } from '@angular/core';

import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { map } from 'rxjs';

@Injectable({
  	providedIn: 'root'
})
export class IngresoEgresoService {

	constructor(
		private firestore: AngularFirestore,
		private authService: AuthService
	) { }

	crearIngresoEgreso( ingresoEgreso: IngresoEgreso ) {
		const { uid, ...data } = ingresoEgreso;
		
		return this.firestore.doc(`${ this.authService.user.uid }/ingreso-egreso`)
			.collection('items')
			.add( { ...data } );
	}

	initIngresosEgresosListener( uid: string ) {

		return this.firestore.collection(`${ uid }/ingreso-egreso/items`)
			.snapshotChanges()
			.pipe(
				map( snapshot => {
					return snapshot.map( doc => ({
						uid: doc.payload.doc.id,
						...doc.payload.doc.data() as any
					}) );
				})
			);
	}

	borrarIngresoEgreso( uidItem: string ) {
		const uid = this.authService.user.uid;
		return this.firestore.doc(`${ uid }/ingreso-egreso/items/${ uidItem }`).delete();
	}

}
