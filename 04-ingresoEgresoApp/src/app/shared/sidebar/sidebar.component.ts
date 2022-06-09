import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styles: [
		`
			li {
				cursor: pointer;
			}
		`
	]
})
export class SidebarComponent implements OnInit, OnDestroy {

	nombreUsuario: string = '';
	userSubs!: Subscription;

	constructor(
		private authService: AuthService,
		private router: Router,
		private store: Store<AppState>
	) { }

	ngOnDestroy(): void {
		this.userSubs.unsubscribe();
	}

	ngOnInit(): void {
		this.userSubs = this.store.select('user')
			.pipe(
				filter( auth => auth.user !== null )
			)
			.subscribe( ({ user }) => {
				this.nombreUsuario = user?.nombre || '';
			});
	}

	logout() {
		this.authService.logout()
			.then( () => this.router.navigate(['/login']) );
	}

}
