import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// NGRX
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Modulos
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';


@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AuthModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		AngularFireAuthModule,
		StoreModule.forRoot( appReducers),
		StoreDevtoolsModule.instrument({
			maxAge: 25, // Retains last 25 states
			logOnly: environment.production, // Restrict extension to log-only mode
		}),
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
