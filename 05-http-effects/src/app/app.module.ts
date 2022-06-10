import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { UsuariosModule } from './usuarios/usuarios.module';

import { appReducers } from './store/app.reducers';
import { environment } from 'src/environments/environment';
import { EffectsArray } from './store/effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
	SharedModule,
	UsuariosModule,
	AppRoutingModule,
	HttpClientModule,
	StoreModule.forRoot( appReducers ),
	EffectsModule.forRoot(EffectsArray),
	StoreDevtoolsModule.instrument({
		maxAge: 25, // Retains last 25 states
		logOnly: environment.production, // Restrict extension to log-only mode
	}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
